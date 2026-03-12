import { useQuery } from "@tanstack/react-query";

import { trpc } from "@/utils/trpc";

export function useTodosQuery() {
  return useQuery(trpc.todo.getAll.queryOptions());
}
