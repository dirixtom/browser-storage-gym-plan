import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The backend is optional; never spam retries against a host that
      // doesn't serve the API (static file / GitHub Pages deployments).
      retry: false,
      refetchOnWindowFocus: false, // opted into per-query (the sync pull)
    },
  },
});
