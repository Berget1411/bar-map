import { useMutation, useQueryClient } from "@tanstack/react-query";

import { trpc } from "@/utils/trpc";

function useInvalidateTodos() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(trpc.todo.getAll.queryOptions());
}

export function useCreateTodo() {
  const invalidate = useInvalidateTodos();
  return useMutation(
    trpc.todo.create.mutationOptions({
      onSuccess: () => invalidate(),
    }),
  );
}

export function useToggleTodo() {
  const invalidate = useInvalidateTodos();
  return useMutation(
    trpc.todo.toggle.mutationOptions({
      onSuccess: () => invalidate(),
    }),
  );
}

export function useDeleteTodo() {
  const invalidate = useInvalidateTodos();
  return useMutation(
    trpc.todo.delete.mutationOptions({
      onSuccess: () => invalidate(),
    }),
  );
}
