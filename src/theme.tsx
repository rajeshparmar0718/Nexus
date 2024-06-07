// app/ThemeProviderWrapper.tsx
'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff1744',
    },
  },
});

export default theme;