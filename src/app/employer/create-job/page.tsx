"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useSupabase } from "@/context/SupabaseAuthProvider";
import { useRouter } from "next/navigation";
import { JobDetails } from "@/utils/employer/interfaces";
import SkillsForm from "@/components/Employer/SkillForms";

export default function CreateJob() {
  const { supabase, session } = useSupabase();
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    companyName: "",
    companyTagline: "",
    title: "",
    salary: "",
    experience: "",
    jobType: "",
    visaSponsorship: "",
    remotePolicy: "",
    location: "",
    hiresRemotelyIn: "",
    preferredTimezones: "",
    relocation: "",
    skills: [],
    description: "",
    responsibilities: "",
    qualifications: "",
    niceToHave: "",
    createdBy: "",
  });
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const user = session?.user;
      if (user) {
        const { data, error } = await supabase
          .from("organizations")
          .select("id, name");

        if (error) {
          console.error("Error fetching organizations:", error.message);
        } else {
          setOrganizations(data);
        }
      }
    };

    fetchOrganizations();
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedOrganization(event.target.value as string);
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      skills: value.split(",").map((skill) => skill.trim()), // Convert skills string to an array
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = session?.user;

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const JobDetailsInstance = supabase.from("jobDetails");
      console.log(JobDetailsInstance);
      const { data: jobDetailsData, error: jobDetailsError } =
        await JobDetailsInstance.insert([
          {
            ...jobDetails,
            createdBy: user.id,
            organizationId: selectedOrganization,
          },
        ])
          .select()
          .single();
      console.log("JobDetailsID:", jobDetailsData.id);
      if (jobDetailsError) {
        console.error("Error creating job details:", jobDetailsError.message);
        setError("Error creating job details. Please try again later.");
        return;
      }
      console.log("JobDetailsID:", jobDetailsData.id);

      const jobInstance = supabase.from("jobs");
      const { data: jobData, error: jobError } = await jobInstance.insert([
        {
          organizationId: selectedOrganization,
          createdBy: user.id,
          jobDetailsId: jobDetailsData.id,
        },
      ]);

      if (jobError) {
        console.error("Error creating job:", jobError.message);
        setError("Error creating job. Please try again later.");
      } else {
        console.log("Job created successfully:", jobData);
        router.push("/employer");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Job Posting
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth required>
            <InputLabel id="organization-select-label">Organization</InputLabel>
            <Select
              labelId="organization-select-label"
              value={selectedOrganization}
              onChange={handleSelectChange}
              label="Organization"
            >
              {organizations.map((org) => (
                <MenuItem key={org.id} value={org.id}>
                  {org.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Company Name"
            name="companyName"
            value={jobDetails.companyName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Company Tagline"
            name="companyTagline"
            value={jobDetails.companyTagline}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Title"
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Salary"
            name="salary"
            value={jobDetails.salary}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Experience"
            name="experience"
            value={jobDetails.experience}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Job Type"
            name="jobType"
            value={jobDetails.jobType}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Visa Sponsorship"
            name="visaSponsorship"
            value={jobDetails.visaSponsorship}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Remote Policy"
            name="remotePolicy"
            value={jobDetails.remotePolicy}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Hires Remotely In"
            name="hiresRemotelyIn"
            value={jobDetails.hiresRemotelyIn}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Preferred Timezones"
            name="preferredTimezones"
            value={jobDetails.preferredTimezones}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Relocation"
            name="relocation"
            value={jobDetails.relocation}
            onChange={handleChange}
            fullWidth
          />
          <SkillsForm
            skills={jobDetails.skills || []}
            handleSkillsChange={handleSkillsChange}
          />

          <TextField
            label="Description"
            name="description"
            value={jobDetails.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="Responsibilities"
            name="responsibilities"
            value={jobDetails.responsibilities}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="Qualifications"
            name="qualifications"
            value={jobDetails.qualifications}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="Nice To Have"
            name="niceToHave"
            value={jobDetails.niceToHave}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Create Job Posting
          </Button>
        </Box>
      </form>
    </Container>
  );
}
