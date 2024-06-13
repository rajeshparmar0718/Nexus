"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { useSupabase } from "@/context/SupabaseAuthProvider";
import { JobDetails } from "@/utils/employer/interfaces";

export default function AppliedJobs() {
  const { supabase, session } = useSupabase();
  const [appliedJobs, setAppliedJobs] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (session?.user) {
      fetchAppliedJobs(session.user.id);
    }
  }, [session]);

  const fetchAppliedJobs = async (userId: string) => {
    try {
      // Fetch the applied jobs from the job_applications table
      const { data: applications, error: applicationsError } = await supabase
        .from("job_applications")
        .select("job_id")
        .eq("user_id", userId);

      if (applicationsError) {
        throw applicationsError;
      }

      if (applications.length > 0) {
        // Extract job IDs from the applications
        const jobIds = applications.map((app) => app.job_id);

        // Fetch job details for the applied jobs
        const { data: jobs, error: jobsError } = await supabase
          .from("jobDetails")
          .select("id, companyName, title, salary, location, jobType")
          .in("id", jobIds);

        if (jobsError) {
          throw jobsError;
        }

        setAppliedJobs(jobs);
      }
    } catch (error: any) {
      console.error("Error fetching applied jobs:", error.message);
    }
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Applications
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Ongoing" />
        <Tab label="Archived" />
      </Tabs>
      <Divider />

      <List>
        {appliedJobs.map((job: any) => (
          <ListItem key={job.id} component={Paper} sx={{ marginBottom: 2 }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ width: 50, height: 50, marginRight: 2 }}>
                    <img
                      src="/path-to-company-logo.png"
                      alt={`${job.companyName} logo`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6">{job.companyName}</Typography>
                    <Typography variant="body2">{job.title}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">Status: Pending</Typography>
                  <Typography variant="body2">
                    Applied: {new Date().toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
