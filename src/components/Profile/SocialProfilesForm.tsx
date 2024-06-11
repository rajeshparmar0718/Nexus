'use client';

import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { UserProfile } from '@/utils/dummyUserProfileData';

interface SocialProfilesFormProps {
  profile: UserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialProfilesForm: React.FC<SocialProfilesFormProps> = ({ profile, handleChange }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Social Profiles</Typography>
      <TextField
        label="Website"
        name="website"
        value={profile.website}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="LinkedIn"
        name="linkedIn"
        value={profile.linkedIn}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="GitHub"
        name="github"
        value={profile.github}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Twitter"
        name="twitter"
        value={profile.twitter}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default SocialProfilesForm;
