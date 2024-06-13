"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Webcam from "react-webcam";
import { UserProfile } from "@/utils/dummyUserProfileData";
import { supabase } from "@/utils/supabase/supabaseClient";
import { error } from "console";

interface ResumeCVTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  recordedVideo: Blob | null;
  setRecordedVideo: React.Dispatch<React.SetStateAction<Blob | null>>;
}

const ResumeCVTab: React.FC<ResumeCVTabProps> = ({
  profile,
  setProfile,
  recordedVideo,
  setRecordedVideo,
}) => {
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [selectedResumeIndex, setSelectedResumeIndex] = useState<number | null>(
    null
  );
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      const mediaStream = webcamRef.current.stream;
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }, []);

  const handleStartRecording = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (webcamRef.current && webcamRef.current.video) {
          webcamRef.current.video.srcObject = stream;
        }
        setRecording(true);
        setRecordedVideo(null);
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  }, [setRecording, setRecordedVideo]);

  const handleStopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (webcamRef.current && webcamRef.current.stream) {
      const mediaStream = webcamRef.current.stream;
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }, [mediaRecorderRef, setRecording]);

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedVideo(data);
        const videoURL = URL.createObjectURL(data);
        setVideoURL(videoURL);
      }
    },
    [setRecordedVideo, setVideoURL]
  );

  const handleRemoveResume = (index: number) => {
    setResumeFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    if (selectedResumeIndex === index) {
      setSelectedResumeIndex(null);
    } else if (selectedResumeIndex !== null && selectedResumeIndex > index) {
      setSelectedResumeIndex(selectedResumeIndex - 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setResumeFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedResumeIndex(index);
  };

  const handleSave = async () => {
    const resumeUrls: string[] = [];
    if (profile.user_id) {
      console.log(profile.user_id);
    }
    try {
      for (const resumeFile of resumeFiles) {
        const uid = new Date().valueOf();
        // const { name, extension } = findFileExtension(file.name);
        const newFileName = `${uid}${resumeFile.name}`;
        const file_path = `/files/${profile.user_id}/${newFileName}`;
        const supabaseStorageInstance = supabase.storage.from("resumes");
        const { data: resumeData, error: resumeError } =
          await supabaseStorageInstance.upload(file_path, resumeFile);
        if (resumeError) {
          console.error("Error uploading resume:", resumeError.message);
        } else {
          const publicUrl = supabase.storage
            .from("resumes")
            .getPublicUrl(resumeData.path).data.publicUrl;
          resumeUrls.push(publicUrl);
        }
      }
      console.log("Resume urls:", resumeUrls);
      const videoUrls: string[] = [];

      if (recordedVideo) {
        const { data: videoData, error: videoError } = await supabase.storage
          .from("resume-videos")
          .upload(`${profile.user_id}/video/webm`, recordedVideo, {
            cacheControl: "3600",
            upsert: true,
          });

        if (videoError) {
          console.error("Error uploading video:", videoError.message);
        } else {
          const publicUrl = supabase.storage
            .from("resume-videos")
            .getPublicUrl(videoData.path).data.publicUrl;
          videoUrls.push(publicUrl);
        }
      }

      const selectedResumeUrl =
        selectedResumeIndex !== null ? resumeUrls[selectedResumeIndex] : null;
      console.log("Updating profile with:", {
        resume: resumeUrls,
        resumeVideo: videoUrls,
        selectedResume: selectedResumeUrl,
      });

      if (!profile.user_id) {
        console.error("User not found");
      }
      const supabaseProfileInstance = supabase.from("profiles");
      const { error: updateError, data } = await supabaseProfileInstance
        .update({
          resume: [...resumeUrls],
          resumeVideo: JSON.stringify(videoUrls),
          selectedResume: selectedResumeUrl,
        })
        .eq("user_id", profile.user_id)
        .select("*");
      console.log("📢 [ResumeCVTab.tsx:171]", data);
      if (updateError) {
        console.error("Error updating profile:", updateError.message);
      } else {
        // Update the local profile state
        setProfile((prevProfile) => ({
          ...prevProfile,
          resume: resumeUrls,
          resumeVideo: videoUrls,
          selectedResume: selectedResumeUrl,
        }));
      }
    } catch (error: any) {
      console.error("Error saving profile:", error.message);
    }
  };
  return (
    <Box>
      <Typography variant="h6">Upload your recent resume or CV</Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Button variant="contained" component="label">
          Upload new file
          <input type="file" hidden onChange={handleFileUpload} multiple />
        </Button>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 2,
        }}
      >
        {resumeFiles.map((file, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedResumeIndex === index}
                  onChange={() => handleCheckboxChange(index)}
                />
              }
              label={file.name}
            />
            <Button variant="text" onClick={() => handleRemoveResume(index)}>
              Remove
            </Button>
          </Paper>
        ))}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Record Video Resume</Typography>
        {videoURL ? (
          <Box>
            <video src={videoURL} controls style={{ width: "100%" }} />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setVideoURL(null)}
              sx={{ mt: 2 }}
            >
              Record Again
            </Button>
          </Box>
        ) : (
          <Box>
            <Webcam
              audio={true}
              ref={webcamRef}
              style={{ width: "100%" }}
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user",
              }}
            />
            {recording ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleStopRecording}
                sx={{ mt: 2 }}
              >
                Stop Recording
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleStartRecording}
                sx={{ mt: 2 }}
              >
                Start Recording
              </Button>
            )}
          </Box>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 4 }}
      >
        Save
      </Button>
    </Box>
  );
};

export default ResumeCVTab;
