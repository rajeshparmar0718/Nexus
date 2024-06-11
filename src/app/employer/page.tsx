'use client';


import { Box, Container, Typography } from '@mui/material';

export default function EmployerDashboard() {
  return (
       <Container>
        <Typography variant="h4" gutterBottom>
          Employer Dashboard
        </Typography>
        <Typography variant="h6">
          Welcome to the Employer Dashboard
        </Typography>
        <Typography>
          Use the sidebar to create an organization or post jobs.
        </Typography>
      </Container>
  );
}
