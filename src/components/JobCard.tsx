// components/JobCard.tsx
'use client';

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, company, location }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary">
          {company}
        </Typography>
        <Typography variant="body2">
          {location}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobCard;
