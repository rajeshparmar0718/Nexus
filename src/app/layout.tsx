// app/layout.tsx
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import SupabaseProvider from "../context/SupabaseAuthProvider";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import theme from '@/theme';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SupabaseProvider>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <Header />
              <main style={{ flex: 1, overflow: 'auto', paddingTop: '64px' }}>
                {children}
              </main>
              <Footer />
            </div>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
