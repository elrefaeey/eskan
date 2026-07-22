type ChatErrorMeta = Record<string, unknown>;

export const logChatError = (
  context: string,
  error: unknown,
  meta?: ChatErrorMeta
) => {
  const detail = error instanceof Error ? error.message : String(error);
  if (meta && Object.keys(meta).length > 0) {
    console.error(`[Chat] ${context}:`, detail, meta, error);
  } else {
    console.error(`[Chat] ${context}:`, detail, error);
  }
};
