'use client';

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { UserProfile } from '@/utils/dummyUserProfileData';
import VideoRecorder from './VideoRecorder';

interface ResumeCVTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ResumeCVTab: React.FC<ResumeCVTabProps> = ({ profile, setProfile }) => {
  const [videoURL, setVideoURL] = useState<string | null>(profile.resumeVideo || null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfile((prevProfile) => ({ ...prevProfile, resume: file.name }));
    }
  };

  const handleRemoveResume = () => {
    setProfile((prevProfile) => ({ ...prevProfile, resume: null }));
  };

  const handleSaveVideo = (url: string) => {
    setVideoURL(url);
    setProfile((prevProfile) => ({ ...prevProfile, resumeVideo: url }));
  };

  const handleClearVideo = () => {
    setVideoURL(null);
    setProfile((prevProfile) => ({ ...prevProfile, resumeVideo: null }));
  };

  return (
    <Box>
      <Typography variant="h6">Upload your recent resume or CV</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button variant="contained" component="label">
          Upload new file
          <input type="file" hidden onChange={handleResumeUpload} />
        </Button>
        {profile.resume && (
          <Box sx={{ ml: 2 }}>
            <Typography>{profile.resume}</Typography>
            <Button variant="text" onClick={handleRemoveResume}>
              Remove your resume
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Record Video Resume</Typography>
        <VideoRecorder onSave={handleSaveVideo} onClear={handleClearVideo} />
      </Box>
    </Box>
  );
};

export default ResumeCVTab;
