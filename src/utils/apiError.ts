export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function extractApiErrorMessage(err: unknown, fallback = 'An error occurred. Please try again.'): string {
  if (!err || typeof err !== 'object') {
    return typeof err === 'string' && err ? err : fallback;
  }

  // RTK Query FetchBaseQueryError shape: { status, data: { message } }
  if ('data' in err) {
    const data = (err as { data?: unknown }).data;
    if (data && typeof data === 'object' && 'message' in data) {
      const msg = (data as { message?: unknown }).message;
      if (typeof msg === 'string' && msg.trim()) return msg;
    }
    if (typeof data === 'string' && data.trim()) return data;
  }

  // SerializedError or standard Error
  if ('message' in err) {
    const msg = (err as { message?: unknown }).message;
    if (typeof msg === 'string' && msg.trim()) return msg;
  }

  if ('error' in err) {
    const msg = (err as { error?: unknown }).error;
    if (typeof msg === 'string' && msg.trim()) return msg;
  }

  return fallback;
}

