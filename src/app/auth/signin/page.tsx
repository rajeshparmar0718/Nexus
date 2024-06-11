// app/auth/signin/page.tsx
'use client';

import React, { useState } from 'react';
import { useSupabase } from '@/context/SupabaseAuthProvider';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Divider, Container } from '@mui/material';

const SignInPage: React.FC = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push('/jobs/home');
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'linkedin') => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign in to your account
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOAuthSignIn('google')}
          fullWidth
          sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/icons/google.svg" alt="Google icon" style={{ marginRight: 8, width: 24, height: 24 }} />
          Sign in with Google
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOAuthSignIn('linkedin')}
          fullWidth
          sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/icons/linkedin.svg" alt="LinkedIn icon" style={{ marginRight: 8, width: 24, height: 24 }} />
          Sign in with LinkedIn
        </Button>
        <Divider sx={{ width: '100%', my: 2 }}>or</Divider>
        <Box
          component="form"
          onSubmit={handleSignIn}
          sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Continue
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Button href="/auth/signup" color="primary">
            Sign up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignInPage;
