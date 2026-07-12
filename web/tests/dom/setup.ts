import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// RTL's auto-cleanup relies on a global `afterEach`, which we don't enable
// (test.globals is off) — register it explicitly instead.
afterEach(cleanup);
