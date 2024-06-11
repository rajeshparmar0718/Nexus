'use client';

import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { UserProfile } from '@/utils/dummyUserProfileData';

interface SkillsFormProps {
  profile: UserProfile;
  handleSkillsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ profile, handleSkillsChange }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Your Skills</Typography>
      <TextField
        label="Your Skills"
        name="skills"
        value={profile.skills?.join(', ')}
        onChange={handleSkillsChange}
        fullWidth
        placeholder="e.g. Python, React"
      />
    </Box>
  );
};

export default SkillsForm;
