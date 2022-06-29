import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';

import { TestUI } from './App';

describe('Accordion test', () => {
  test('should show title all the time', () => {
    render(<TestUI title="Testing" />);

    expect(screen.getByText(/Testing/i)).toBeDefined();
  });
});
