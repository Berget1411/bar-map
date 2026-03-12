import { useChat } from "@ai-sdk/react";
import { env } from "@open-learn/env/web";
import { Button } from "@open-learn/ui/components/button";
import { Input } from "@open-learn/ui/components/input";
import { cn } from "@open-learn/ui/lib/utils";
import { DefaultChatTransport } from "ai";
import { SendIcon } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";

export default function AiPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${env.VITE_SERVER_URL}/ai`,
    }),
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();

    if (!text) {
      return;
    }

    sendMessage({ text });
    setInput("");
  };

  return (
    <div className="grid h-full min-h-0 grid-rows-[1fr_auto] overflow-hidden">
      <div className="flex min-h-0 flex-col gap-4 overflow-y-auto pb-4">
        {messages.length === 0 ? (
          <div className="mt-8 text-center text-muted-foreground">
            Ask me anything to get started.
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "rounded-lg p-3",
                message.role === "user" ? "ml-8 bg-primary/10" : "mr-8 bg-secondary/20",
              )}
            >
              <p className="mb-1 text-sm font-semibold">
                {message.role === "user" ? "You" : "AI Assistant"}
              </p>
              {message.parts
                ?.filter((part) => part.type === "text")
                .map((part, textIndex) => (
                  <Streamdown
                    key={`${message.id}-text-${textIndex}`}
                    isAnimating={status === "streaming" && message.role === "assistant"}
                  >
                    {part.text}
                  </Streamdown>
                ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 border-t pt-2">
        <Input
          name="prompt"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your message..."
          className="flex-1"
          autoComplete="off"
        />
        <Button type="submit" size="icon" aria-label="Send message">
          <SendIcon />
        </Button>
      </form>
    </div>
  );
}
