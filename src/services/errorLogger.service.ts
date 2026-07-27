export const logClientError = async (error: unknown, context?: Record<string, unknown>) => {
  const payload = {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    context,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    timestamp: new Date().toISOString(),
  };

  console.error('Client error:', payload);

  const endpoint = import.meta.env.VITE_ERROR_LOG_ENDPOINT || '/api/errors';

  try {
    const body = JSON.stringify(payload);

    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      navigator.sendBeacon(endpoint, body);
      return;
    }

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    });
  } catch (sendError) {
    console.warn('Unable to send error log to the server.', sendError);
  }
};
