'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '../components/theme-provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};
