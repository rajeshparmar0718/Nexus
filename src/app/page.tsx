import { Container, Typography, Box, Button } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Nexus
        </Typography>
        
      </Box>
    </Container>
  );
}
