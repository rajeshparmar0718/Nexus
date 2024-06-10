// app/auth/signup/[[...signup]].tsx
"use client"
import { SignIn, SignUp, useUser } from '@clerk/nextjs';
import { Container, Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignUpPage ()  {
 
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (isSignedIn) {
  //     const redirectPath = localStorage.getItem('redirectAfterSignUp');
  //     if (redirectPath) {
  //       localStorage.removeItem('redirectAfterSignUp');
        
  //       window.location.href = redirectPath;
  //     } else {
  //       window.location.href = '/';
  //     }
  //   }
  // }, [isSignedIn, pathname]);
  const [redirectUrl, setRedirectUrl] = useState<string>('/jobs/home');

  useEffect(() => {
    const storedRedirectUrl = localStorage.getItem('redirectAfterSignUp');
    if (storedRedirectUrl) {
      setRedirectUrl(storedRedirectUrl);
      localStorage.removeItem('redirectAfterSignUp'); // Clear the stored value after using it
    }
  }, []);
  return(
    <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
        <SignUp path="/auth/signup" redirectUrl={redirectUrl} routing="path" signInUrl="/auth/signin"/>
        </Box>
      </Container>
    )
    
}
