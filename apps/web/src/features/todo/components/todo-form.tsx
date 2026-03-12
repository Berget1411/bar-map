import { Button } from "@open-learn/ui/components/button";
import { Input } from "@open-learn/ui/components/input";
import { Loader2 } from "lucide-react";
import type { FormEvent } from "react";

import { TODO_COPY } from "../constants";

interface TodoFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}

export function TodoForm({ value, onChange, onSubmit, isPending }: TodoFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6 flex items-center space-x-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={TODO_COPY.addPlaceholder}
        disabled={isPending}
      />
      <Button type="submit" disabled={isPending || !value.trim()}>
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : TODO_COPY.addButton}
      </Button>
    </form>
  );
}
