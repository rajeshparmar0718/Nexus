'use client';

import React from 'react';
import { Box, Button, Avatar, TextField } from '@mui/material';
import { UserProfile } from '@/utils/dummyUserProfileData';

interface PersonalDetailsFormProps {
  profile: UserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ profile, handleChange, handleFileChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Avatar src={profile.image || ''} sx={{ width: 56, height: 56 }} />
        <Button variant="contained" component="label">
          Upload a new photo
          <input type="file" name="image" hidden onChange={handleFileChange} />
        </Button>
      </Box>
      <TextField
        label="Your name"
        name="firstName"
        value={profile.firstName}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Where are you based?"
        name="city"
        value={profile.city}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Select your primary role"
        name="primaryRole"
        value={profile.primaryRole}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Years of experience"
        name="yearsOfExperience"
        value={profile.yearsOfExperience}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Open to the following roles"
        name="openRoles"
        value={profile.openRoles}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Your bio"
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
      />
    </Box>
  );
};

export default PersonalDetailsForm;
