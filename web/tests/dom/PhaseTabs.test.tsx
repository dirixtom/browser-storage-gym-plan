import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PhaseTabs } from '@/components/PhaseTabs';
import { PHASES } from '@/data/phases';

describe('PhaseTabs', () => {
  it('renders one tab per phase and marks the current one as active', () => {
    render(<PhaseTabs current={1} onSelect={() => {}} />);
    const tabs = screen.getAllByRole('button');
    expect(tabs).toHaveLength(PHASES.length);
    expect(tabs[1]).toHaveAttribute('aria-current', 'page');
    expect(tabs[0]).not.toHaveAttribute('aria-current');
  });

  it('calls onSelect with the clicked phase index', () => {
    const onSelect = vi.fn();
    render(<PhaseTabs current={0} onSelect={onSelect} />);
    fireEvent.click(screen.getAllByRole('button')[2]);
    expect(onSelect).toHaveBeenCalledWith(PHASES[2].index);
  });
});
