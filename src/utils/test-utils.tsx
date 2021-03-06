import React from 'react';
import { render } from '@testing-library/react';
import theme from '@pf85-ui/theme';
import { ThemeProvider } from 'styled-components';

export function renderWithStyledTheme(
  component: React.ReactNode,
  renderFunction: any = render
) {
  return {
    ...renderFunction(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
  };
}
