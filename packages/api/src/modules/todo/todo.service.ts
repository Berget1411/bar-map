import { todoRepository } from "@open-learn/db";

import type { CreateTodoInput, DeleteTodoInput, ToggleTodoInput } from "./todo.schema";

export const todoService = {
  getAll() {
    return todoRepository.getAll();
  },

  create(input: CreateTodoInput) {
    return todoRepository.create(input);
  },

  toggle(input: ToggleTodoInput) {
    return todoRepository.toggle(input);
  },

  delete(input: DeleteTodoInput) {
    return todoRepository.delete(input);
  },
};
