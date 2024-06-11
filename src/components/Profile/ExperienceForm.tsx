'use client';

import React from 'react';
import { Box, Button, Checkbox, Divider, FormControlLabel, TextField } from '@mui/material';
import { WorkExperience } from '@/utils/dummyUserProfileData';

interface ExperienceFormProps {
  experience: WorkExperience;
  setExperience: React.Dispatch<React.SetStateAction<WorkExperience>>;
  handleAddExperience: () => void;
  setAddingExperience: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experience,
  setExperience,
  handleAddExperience,
  setAddingExperience,
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      <TextField
        label="Company Name"
        name="companyName"
        value={experience.companyName}
        onChange={(e) => setExperience({ ...experience, companyName: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Title"
        name="title"
        value={experience.title}
        onChange={(e) => setExperience({ ...experience, title: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Start Date"
        name="startDate"
        type="date"
        value={experience.startDate}
        onChange={(e) => setExperience({ ...experience, startDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 2 }}
      />
      {!experience.currentlyWorking && (
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={experience.endDate}
          onChange={(e) => setExperience({ ...experience, endDate: e.target.value })}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mb: 2 }}
        />
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={experience.currentlyWorking}
            onChange={(e) => setExperience({ ...experience, currentlyWorking: e.target.checked })}
          />
        }
        label="Currently Working"
      />
      <Divider/>
      <TextField
        label="Description"
        name="description"
        value={experience.description}
        onChange={(e) => setExperience({ ...experience, description: e.target.value })}
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={handleAddExperience}>Add</Button>
        <Button variant="outlined" onClick={() => setAddingExperience(false)}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default ExperienceForm;
