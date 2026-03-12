import { toast } from "sonner";

export function formatAuthError(error: { error: { message?: string; statusText?: string } }) {
  return error.error.message ?? error.error.statusText ?? "An unexpected error occurred";
}

export function handleAuthError(error: { error: { message?: string; statusText?: string } }) {
  toast.error(formatAuthError(error));
}
