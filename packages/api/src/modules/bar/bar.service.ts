import { barRepository } from "@open-learn/db";

import type { CreateBarInput, DeleteBarInput } from "./bar.schema";

export const barService = {
  getAll() {
    return barRepository.getAll();
  },

  getOpen() {
    return barRepository.getOpen();
  },

  create(input: CreateBarInput) {
    return barRepository.create(input);
  },

  delete(input: DeleteBarInput) {
    return barRepository.delete(input);
  },
};
