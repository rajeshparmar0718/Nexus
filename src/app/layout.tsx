// app/layout.tsx
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import theme from '../theme';
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider, SignIn, SignOutButton, SignedIn } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';
import ThemeProviderWrapper from '@/components/Provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <ThemeProviderWrapper>   
         <Header />
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <main style={{ flex: 1, overflow: 'auto', paddingTop: '64px' }}>
              {children}
            </main>
            <Footer />
          </div>
          </ThemeProviderWrapper>
      </body>
    </html>
  );
}
