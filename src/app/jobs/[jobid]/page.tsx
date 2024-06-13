"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Avatar,
  TextField,
} from "@mui/material";
import { useSupabase } from "@/context/SupabaseAuthProvider";
import { JobDetails } from "@/utils/employer/interfaces"; // Adjust the import path as needed

export default function JobDetailPage() {
  const { supabase, session } = useSupabase();
  const { jobid } = useParams() as { jobid: string };
  const [job, setJob] = useState<JobDetails | null>(null);
  const [applied, setApplied] = useState<boolean>(false);
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [selectedResumeIndex, setSelectedResumeIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (jobid && session?.user) {
      fetchJobDetails(jobid);
      checkIfJobApplied(jobid);
    } else if (!session?.user) {
      setLoading(false);
      console.error("User not authenticated");
    }
  }, [jobid, session]);

  const fetchJobDetails = async (jobid: string) => {
    console.log("fetch table call", session?.user.id);
    const { data, error } = await supabase
      .from("jobDetails")
      .select("*")
      .eq("id", jobid)
      .single();

    if (error) {
      console.error("Error fetching job details:", error.message);
    } else {
      setJob(data);
    }
    setLoading(false);
  };

  const checkIfJobApplied = async (jobid: string) => {
    const user = session?.user;
    if (!user) {
      console.error("User not found");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .eq("job_id", jobid)
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking job application status:", error.message);
      } else {
        setApplied(!!data);
      }
    } catch (error: any) {
      console.error("Error applying to job:", error.message);
    }
  };

  const handleApply = async () => {
    const resumeUrl = await uploadResume();
    if (resumeUrl) {
      const jobApplicationInstance = supabase.from("job_applications");
      const { error } = await jobApplicationInstance.insert({
        user_id: session?.user.id,
        job_id: jobid,
        resume_url: resumeUrl,
      });

      if (error) {
        console.error("Error applying to job:", error.message);
      } else {
        setApplied(true);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setResumeFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const uploadResume = async () => {
    if (resumeFiles.length === 0) return null;
    const resumeFile = resumeFiles[0]; // Take the first file for simplicity
    const user = session?.user;
    if (!user) return null;

    const uid = new Date().valueOf();
    const newFileName = `${uid}${resumeFile.name}`;
    const file_path = `/files/${user.id}/${newFileName}`;
    const supabaseStorageInstance = supabase.storage.from("resumes");

    const { data: resumeData, error: resumeError } =
      await supabaseStorageInstance.upload(file_path, resumeFile);

    if (resumeError) {
      console.error("Error uploading resume:", resumeError.message);
    } else {
      const { data: publicUrlData } = supabase.storage
        .from("resumes")
        .getPublicUrl(resumeData.path);

      if (!publicUrlData) {
        console.error("Resume URL not found");
      }
      return publicUrlData?.publicUrl;
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!job) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Job Not Found
        </Typography>
      </Container>
    );
  }

  const {
    companyName = "N/A",
    companyTagline = "No tagline available",
    title = "N/A",
    salary = "N/A",
    experience = "N/A",
    jobType = "N/A",
    visaSponsorship = "N/A",
    remotePolicy = "N/A",
    location = "N/A",
    hiresRemotelyIn = "N/A",
    preferredTimezones = "N/A",
    relocation = "N/A",
    skills = [],
    description = "No description available",
    responsibilities = "No responsibilities available",
    qualifications = "No qualifications available",
    niceToHave = "No nice-to-have skills available",
  } = job;

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="/path-to-company-logo.png"
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">{companyName}</Typography>
            <Typography variant="subtitle1">{companyTagline}</Typography>
          </Box>
        </Box>
        <Box>
          <Button variant="outlined" sx={{ mr: 2 }}>
            Share
          </Button>
          <Button variant="outlined">Save</Button>
        </Box>
      </Box>

      <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
        {title} ({experience} years exp) ${salary}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Job Type</Typography>
            <Typography variant="body2">{jobType}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Visa Sponsorship
            </Typography>
            <Typography variant="body2">{visaSponsorship}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Remote Policy
            </Typography>
            <Typography variant="body2">{remotePolicy}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Location
            </Typography>
            <Typography variant="body2">{location}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Hires Remotely In
            </Typography>
            <Typography variant="body2">{hiresRemotelyIn}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Preferred Timezones
            </Typography>
            <Typography variant="body2">{preferredTimezones}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Relocation
            </Typography>
            <Typography variant="body2">{relocation}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Skills
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {skills.map((skill) => (
                <Paper key={skill} sx={{ p: 1 }}>
                  {skill}
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Apply to {companyName}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Is your profile up to date? Click <a href="#">here</a> to verify
              how you will appear to recruiters.
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2 }}
              disabled={applied} // Disable the input if the job is applied for
            >
              Upload Resume
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            {resumeFiles.length > 0 && (
              <Typography sx={{ mt: 1 }}>{resumeFiles[0].name}</Typography>
            )}
            {applied ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled
              >
                Applied
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleApply}
              >
                Apply
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6">Job Description</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {description}
        </Typography>
      </Paper>

      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6">Responsibilities</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {responsibilities}
        </Typography>
      </Paper>

      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6">Qualifications</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {qualifications}
        </Typography>
      </Paper>

      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6">Nice-To-Have</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {niceToHave}
        </Typography>
      </Paper>
    </Container>
  );
}
