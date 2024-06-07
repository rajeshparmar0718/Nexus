// app/page.tsx
import Link from 'next/link';
import { Container, Typography, Box, Button, AppBar, Toolbar } from '@mui/material';
import StoreUserDetails from '@/components/StoreUserDetails';
import LogoutButton from '@/components/LogoutButton';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Next.js App
          </Typography>
          <Button color="inherit" href="/auth/signin">Sign In</Button>
          <Button color="inherit" href="/auth/signup">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Next.js App with Clerk
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'A simple application demonstrating user authentication using Clerk'}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" href="/auth/signin" sx={{ mr: 2 }}>
            Sign In
          </Button>
          <Button variant="outlined" color="secondary" href="/auth/signup">
            Sign Up
          </Button>
          <StoreUserDetails />
      <LogoutButton />
        </Box>
      </Box>
    </Container>
  );
}
