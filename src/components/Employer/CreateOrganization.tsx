'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { useSupabase } from '@/context/SupabaseAuthProvider';


const CreateOrganization = () => {
  const { supabase, session } = useSupabase();
  const [orgName, setOrgName] = useState('');
  const [orgDesc, setOrgDesc] = useState('');

  const handleCreateOrganization = async () => {
    const { data, error } = await supabase
      .from('organizations')
      .insert([{ name: orgName, description: orgDesc, user_id: session?.user?.id }]);

    if (error) {
      console.error('Error creating organization:', error.message);
    } else {
      console.log('Organization created successfully:', data);
      setOrgName('');
      setOrgDesc('');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Organization</Typography>
      <TextField
        label="Organization Name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Organization Description"
        value={orgDesc}
        onChange={(e) => setOrgDesc(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleCreateOrganization}>Create Organization</Button>
    </Container>
  );
};

export default CreateOrganization;
