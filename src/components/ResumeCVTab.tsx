'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Webcam from 'react-webcam';
import { UserProfile } from '@/utils/dummyUserProfileData';
import { supabase } from '@/utils/supabaseClient';

interface ResumeCVTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ResumeCVTab: React.FC<ResumeCVTabProps> = ({ profile, setProfile }) => {
  const [videoURL, setVideoURL] = useState<string | null>(profile.resumeVideo || null);
  const [recording, setRecording] = useState<boolean>(false);
  const [capturedVideo, setCapturedVideo] = useState<Blob | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleStartRecording = useCallback(() => {
    setRecording(true);
    setCapturedVideo(null);
    const mediaStream = webcamRef.current?.stream;
    if (mediaStream) {
      mediaRecorderRef.current = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setRecording]);

  const handleStopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }, [mediaRecorderRef, setRecording]);

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setCapturedVideo(data);
        const videoURL = URL.createObjectURL(data);
        setVideoURL(videoURL);
        setProfile((prevProfile) => ({ ...prevProfile, resumeVideo: videoURL }));
      }
    },
    [setCapturedVideo, setVideoURL, setProfile]
  );

  const handleRemoveResume = () => {
    setProfile((prevProfile) => ({ ...prevProfile, resume: null }));
    setResumeFile(null);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setResumeFile(file);
      setProfile((prevProfile) => ({ ...prevProfile, resume: file.name }));
    }
  };

  const handleRecordAgain = () => {
    setVideoURL(null);
    setProfile((prevProfile) => ({ ...prevProfile, resumeVideo: null }));
    setCapturedVideo(null);
    localStorage.removeItem('resumeVideo'); // Remove the video URL from local storage
  };

  const handleSave = async () => {
    if (resumeFile) {
      const { data: resumeData, error: resumeError } = await supabase.storage
        .from('resumes')
        .upload(`public/${profile.user_id}-resume.${resumeFile.name.split('.').pop()}`, resumeFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (resumeError) {
        console.error('Error uploading resume:', resumeError.message);
      } else {
        const publicUrl = supabase.storage.from('resumes').getPublicUrl(resumeData.path).data.publicUrl;
        setProfile((prevProfile) => ({ ...prevProfile, resume: publicUrl }));
        
        // Save the resume URL to the user profile in Supabase
        await supabase
          .from('profiles')
          .update({ resume: publicUrl })
          .eq('user_id', profile.user_id);
      }
    }

    if (capturedVideo) {
      const { data: videoData, error: videoError } = await supabase.storage
        .from('resume-videos')
        .upload(`public/${profile.user_id}-video.webm`, capturedVideo, {
          cacheControl: '3600',
          upsert: true,
        });

      if (videoError) {
        console.error('Error uploading video:', videoError.message);
      } else {
        const publicUrl = supabase.storage.from('resume-videos').getPublicUrl(videoData.path).data.publicUrl;
        setProfile((prevProfile) => ({ ...prevProfile, resumeVideo: publicUrl }));
        
        // Save the video URL to the user profile in Supabase
        await supabase
          .from('profiles')
          .update({ resumeVideo: publicUrl })
          .eq('user_id', profile.user_id);
      }
    }
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
            <Typography>Uploaded Resume: <a href={profile.resume} target="_blank" rel="noopener noreferrer">View</a></Typography>
            <Button variant="text" onClick={handleRemoveResume}>
              Remove your resume
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Record Video Resume</Typography>
        {videoURL ? (
          <Box>
            <video src={videoURL} controls style={{ width: '100%' }} />
            <Button variant="contained" color="secondary" onClick={handleRecordAgain} sx={{ mt: 2 }}>
              Record Again
            </Button>
          </Box>
        ) : (
          <Box>
            <Webcam
              audio={true}
              ref={webcamRef}
              style={{ width: '100%' }}
              videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
            />
            {recording ? (
              <Button variant="contained" color="primary" onClick={handleStopRecording} sx={{ mt: 2 }}>
                Stop Recording
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleStartRecording} sx={{ mt: 2 }}>
                Start Recording
              </Button>
            )}
          </Box>
        )}
      </Box>
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 4 }}>
        Save
      </Button>
    </Box>
  );
};

export default ResumeCVTab;
