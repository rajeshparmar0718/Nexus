'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useReactMediaRecorder } from 'react-media-recorder';

interface VideoRecorderProps {
  onSave: (url: string) => void;
  onClear: () => void;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ onSave, onClear }) => {
  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({ video: true, audio: true });

  const handleStopRecording = () => {
    stopRecording();
  };

  useEffect(() => {
    if (mediaBlobUrl) {
      onSave(mediaBlobUrl);
    }
  }, [mediaBlobUrl, onSave]);

  return (
    <Box>
      {mediaBlobUrl ? (
        <Box>
          <video src={mediaBlobUrl} controls style={{ width: '100%' }} />
          <Button variant="contained" color="secondary" onClick={() => { clearBlobUrl(); onClear(); }} sx={{ mt: 2 }}>
            Record Again
          </Button>
        </Box>
      ) : (
        <Box>
          <Button variant="contained" color="primary" onClick={startRecording} sx={{ mt: 2, mr: 2 }}>
            Start Recording
          </Button>
          <Button variant="contained" color="primary" onClick={handleStopRecording} sx={{ mt: 2 }}>
            Stop Recording
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VideoRecorder;
