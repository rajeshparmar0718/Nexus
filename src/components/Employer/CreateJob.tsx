'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Container, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useSupabase } from '@/context/SupabaseAuthProvider';
import { Database } from '@/utils/employer/supabasetypes';


const CreateJob = () => {
  const { supabase, session } = useSupabase();
  const [organizations, setOrganizations] = useState<Database['public']['Tables']['organizations']['Row'][]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDesc, setJobDesc] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('user_id', session?.user?.id);

      if (error) {
        console.error('Error fetching organizations:', error.message);
      } else {
        setOrganizations(data);
      }
    };

    fetchOrganizations();
  }, [supabase, session]);

  const handleCreateJob = async () => {
    const { data, error } = await supabase
      .from('jobs')
      .insert([{ 
        title: jobTitle, 
        description: jobDesc, 
        due_date: dueDate, 
        organization_id: selectedOrg,
        user_id: session?.user?.id 
      }]);

    if (error) {
      console.error('Error creating job:', error.message);
    } else {
      console.log('Job created successfully:', data);
      setJobTitle('');
      setJobDesc('');
      setDueDate('');
      setSelectedOrg('');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Job Posting</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Organization</InputLabel>
        <Select
          value={selectedOrg}
          onChange={(e) => setSelectedOrg(e.target.value)}
        >
          {organizations.map((org) => (
            <MenuItem key={org.id} value={org.id}>{org.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Job Description"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={handleCreateJob}>Create Job</Button>
    </Container>
  );
};

export default CreateJob;
