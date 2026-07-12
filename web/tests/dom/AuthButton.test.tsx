import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AuthButton } from '@/components/AuthButton';

function renderWithClient(ui: ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe('AuthButton', () => {
  it('renders nothing while no backend is reachable (available: false)', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('offline')) as typeof fetch;
    const { container } = renderWithClient(<AuthButton />);
    await waitFor(() => expect(container).toBeEmptyDOMElement());
  });

  it('shows "Sign in" when the backend says loggedIn: false', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ loggedIn: false }), { status: 200 }),
    ) as typeof fetch;
    renderWithClient(<AuthButton />);
    expect(await screen.findByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('shows "Sign out" when the backend says loggedIn: true', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ loggedIn: true, github_login: 'tdirix' }), { status: 200 }),
    ) as typeof fetch;
    renderWithClient(<AuthButton />);
    expect(await screen.findByRole('button', { name: 'Sign out' })).toBeInTheDocument();
  });
});
