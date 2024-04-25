export const DEFAULT_ERROR_OBJECT = { error: false, message: " " };

export function buildError(message) {
  return { error: true, message };
}
