export const DEFAULT_ERROR_OBJECT = { error: false, message: " " };

export function buildErrorObject(message) {
  return { error: true, message };
}

export function buildFieldError(stateCallback, message) {
  stateCallback(buildErrorObject(message));
}

export function resetFieldError(stateCallback) {
  stateCallback(DEFAULT_ERROR_OBJECT);
}
