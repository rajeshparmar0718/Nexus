// app/auth/signin/[[...signin]].tsx
import { SignIn } from '@clerk/nextjs';
import { Container, Box, Typography } from '@mui/material';

const SignInPage = () => (
  <Container maxWidth="sm">
    <Box sx={{ mt: 8 }}>
      <SignIn path="/auth/signin" routing="path" />
    </Box>
  </Container>
);

export default SignInPage;
