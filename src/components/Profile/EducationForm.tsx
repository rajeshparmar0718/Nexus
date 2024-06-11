'use client';

import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Education } from '@/utils/dummyUserProfileData';

interface EducationFormProps {
  education: Education;
  setEducation: React.Dispatch<React.SetStateAction<Education>>;
  handleAddEducation: () => void;
  setAddingEducation: React.Dispatch<React.SetStateAction<boolean>>;
}

const EducationForm: React.FC<EducationFormProps> = ({
  education,
  setEducation,
  handleAddEducation,
  setAddingEducation,
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      <TextField
        label="University Name"
        name="universityName"
        value={education.universityName}
        onChange={(e) => setEducation({ ...education, universityName: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Course Name"
        name="courseName"
        value={education.courseName}
        onChange={(e) => setEducation({ ...education, courseName: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Degree"
        name="degree"
        value={education.degree}
        onChange={(e) => setEducation({ ...education, degree: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Start Date"
        name="startDate"
        type="date"
        value={education.startDate}
        onChange={(e) => setEducation({ ...education, startDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 2 }}
      />
      {!education.currentlyStudying && (
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={education.endDate}
          onChange={(e) => setEducation({ ...education, endDate: e.target.value })}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mb: 2 }}
        />
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={education.currentlyStudying}
            onChange={(e) => setEducation({ ...education, currentlyStudying: e.target.checked })}
          />
        }
        label="Currently Studying"
      />
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={handleAddEducation}>Add</Button>
        <Button variant="outlined" onClick={() => setAddingEducation(false)}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default EducationForm;
