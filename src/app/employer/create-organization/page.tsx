'use client';

import { Box, Typography, TextField, Button } from '@mui/material';

export default function CreateOrganization() {
  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    
      <Box>
        <Typography variant="h4" gutterBottom>
          Create Organization
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Organization Name" fullWidth margin="normal" />
          <TextField label="Description" fullWidth margin="normal" multiline rows={4} />
          <Button variant="contained" color="primary" type="submit">
            Create Organization
          </Button>
        </form>
      </Box>
    
  );
}
