// app/auth/signup/[[...signup]].tsx
import { SignUp } from '@clerk/nextjs';
import { Container, Box, Typography } from '@mui/material';

const SignUpPage = () => (
  <Container maxWidth="sm">
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <SignUp path="/auth/signup" routing="path" />
    </Box>
  </Container>
);

export default SignUpPage;
