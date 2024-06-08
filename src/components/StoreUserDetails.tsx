'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function StoreUserDetails() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
        console.log(user);
      const userInfo = {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        // Add any other user fields you want to store
      };

      // Send userInfo to your backend to store in the database
      fetch('/api/store-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
    }
    console.log(user);
  }, [user]);

  return null; // This component doesn't render anything visible
}
