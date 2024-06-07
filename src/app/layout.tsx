// app/layout.tsx
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import theme from '../theme';
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });
interface ThemeProviderWrapperProps {
  children: ReactNode;
}

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => (
  <ClerkProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </ClerkProvider>
);


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
