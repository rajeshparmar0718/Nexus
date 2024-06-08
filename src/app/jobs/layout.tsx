import Sidebar from '@/components/Sidebar';

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: '16px', marginLeft: '240px', marginTop: '64px' }}>
        {children}
      </main>
    </div>
  );
}
