'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';
import { populateLocalStorage, fetchJobsFromLocalStorage, Job } from '@/utils/dummyJobsData';

export default function Jobs() {
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Populate local storage with dummy data on component mount
    populateLocalStorage(); 
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = fetchJobsFromLocalStorage(role, city);
      setJobs(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Jobs
      </Typography>
      <Paper sx={{ padding: '16px', marginTop: '16px', marginBottom: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Search for jobs
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <TextField
            label="Search for job role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Find
        </Button>
      </Paper>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {jobs.map((job) => (
          <ListItem key={job.id} component={Paper} sx={{ marginBottom: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }}>
                  <Typography variant="h6">{job.companyName}</Typography>
                  <Box>
                    <Typography variant="body2">{job.title}</Typography>
                    <Typography variant="body2">${job.salary}</Typography>
                  </Box>
                </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2">{job.location || 'N/A'}</Typography>
                  <Typography variant="body2">{job.jobType || 'N/A'}</Typography>
                </Box>
                <Link href={`/jobs/${job.id}`} passHref>
                <Button variant="contained" color="primary">
                  Read more
                </Button>
                </Link>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
