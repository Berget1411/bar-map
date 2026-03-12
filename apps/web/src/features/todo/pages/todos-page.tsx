import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@open-learn/ui/components/card";
import { useState } from "react";
import type { FormEvent } from "react";

import { TODO_COPY } from "../constants";
import { useCreateTodo } from "../services/mutations";
import { useTodosQuery } from "../services/queries";
import { TodoForm } from "../components/todo-form";
import { TodoList } from "../components/todo-list";

export default function TodosPage() {
  const [newTodoText, setNewTodoText] = useState("");

  const todosQuery = useTodosQuery();
  const createMutation = useCreateTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      createMutation.mutate(
        { text: newTodoText },
        {
          onSuccess: () => setNewTodoText(""),
        },
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>{TODO_COPY.cardTitle}</CardTitle>
          <CardDescription>{TODO_COPY.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <TodoForm
            value={newTodoText}
            onChange={setNewTodoText}
            onSubmit={handleSubmit}
            isPending={createMutation.isPending}
          />
          <TodoList todos={todosQuery.data} isLoading={todosQuery.isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
