'use client';

import { useClerk } from '@clerk/nextjs';
import { useCallback } from 'react';

export default function LogoutButton() {
  const { signOut } = useClerk();

  const handleLogout = useCallback(() => {
    signOut().catch(error => {
      console.error('Error during sign out:', error);
    });
  }, [signOut]);

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
