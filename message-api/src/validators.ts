import { CreateMessageInput } from './types';

export type ValidationResult<T> =
  | { valid: true; data: T }
  | { valid: false; error: string };

export function validateCreateMessageInput(
  body: unknown
): ValidationResult<CreateMessageInput> {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, error: 'Request body must be a JSON object.' };
  }

  const { content, author } = body as Record<string, unknown>;

  if (typeof content !== 'string' || content.trim() === '') {
    return {
      valid: false,
      error: 'Content is required and must be a non-empty string.',
    };
  }

  if (author !== undefined && typeof author !== 'string') {
    return { valid: false, error: 'Author must be a string when provided.' };
  }

  return {
    valid: true,
    data: {
      content: content.trim(),
      author: author?.trim() || undefined,
    },
  };
}
