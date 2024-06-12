// components/SkillsForm.tsx
"use client";

import React from "react";
import { Box, TextField, Typography } from "@mui/material";

interface SkillsFormProps {
  skills: string[];
  handleSkillsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  handleSkillsChange,
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Skills Required</Typography>
      <TextField
        label="Skills"
        name="skills"
        value={skills?.join(", ")}
        onChange={handleSkillsChange}
        fullWidth
        placeholder="e.g. Python, React"
      />
    </Box>
  );
};

export default SkillsForm;
