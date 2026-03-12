import { Button } from "@open-learn/ui/components/button";
import { Checkbox } from "@open-learn/ui/components/checkbox";
import { Trash2 } from "lucide-react";

import { TODO_COPY } from "../constants";
import { useDeleteTodo, useToggleTodo } from "../services/mutations";

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoItem({ id, text, completed }: TodoItemProps) {
  const toggleMutation = useToggleTodo();
  const deleteMutation = useDeleteTodo();

  return (
    <li className="flex items-center justify-between rounded-md border p-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={completed}
          onCheckedChange={() => toggleMutation.mutate({ id, completed: !completed })}
          id={`todo-${id}`}
        />
        <label htmlFor={`todo-${id}`} className={completed ? "line-through" : ""}>
          {text}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteMutation.mutate({ id })}
        aria-label={TODO_COPY.deleteAriaLabel}
        disabled={deleteMutation.isPending}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}
