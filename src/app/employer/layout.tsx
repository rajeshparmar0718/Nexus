'use client';

import EmployerSidebar from '@/components/Employer/EmployerSidebar';
import { Box } from '@mui/material';

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <EmployerSidebar />
      <main style={{ flexGrow: 1, padding: '16px', marginLeft: '240px', marginTop: '64px' }}>
        {children}
      </main>
    </div>
  );
}
