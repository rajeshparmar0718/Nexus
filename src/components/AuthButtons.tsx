
'use client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@mui/material';
import { useState } from 'react';
 // or the appropriate Button import

export default function AuthButtons() {

return (
    <div>
     
          <Button color="inherit" href="/auth/signin">Sign In</Button>
          <Button color="inherit" href="/auth/signup">Sign Up</Button>
     
    </div>
  );
}
