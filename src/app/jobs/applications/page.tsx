'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Divider, Tabs, Tab } from '@mui/material';
import { fetchAppliedJobs, Job } from '@/utils/dummyJobsData';

export default function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const jobs = fetchAppliedJobs();
    setAppliedJobs(jobs);
  }, []);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Applications
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Ongoing" />
        <Tab label="Archived" />
      </Tabs>
      <Divider />

      <List>
        {appliedJobs.map((job) => (
          <ListItem key={job.id} component={Paper} sx={{ marginBottom: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 50, height: 50, marginRight: 2 }}>
                    <img src="/path-to-company-logo.png" alt={`${job.companyName} logo`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6">{job.companyName}</Typography>
                    <Typography variant="body2">{job.title}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">Status: Pending</Typography>
                  <Typography variant="body2">Applied: {new Date().toLocaleDateString()}</Typography>
                </Box>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
