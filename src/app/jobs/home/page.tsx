"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RoleGuard from "@/components/RoleGuard";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  company: string;
  location: string;
  status: string;
  lastUpdated: string;
}

const statusOptions = [
  {
    value: "Ready to interview",
    description:
      "You’re actively looking for new work and ready to interview. Your job profile will be visible to startups.",
  },
  {
    value: "Open to offers",
    description:
      "You’re not looking but open to hear about new opportunities. Your job profile will be visible to startups.",
  },
  {
    value: "Closed to offers",
    description:
      "You’re not looking and don’t want to hear about new opportunities. Your job profile will be hidden to startups.",
  },
];

export default function JobsHome() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [statusDescription, setStatusDescription] = useState<string>("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      const selectedStatus = statusOptions.find(
        (option) => option.value === parsedProfile.status
      );
      setStatusDescription(selectedStatus?.description || "");
    }
  }, []);

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status: string, description: string) => {
    if (profile) {
      const updatedProfile = { ...profile, status };
      setProfile(updatedProfile);
      setStatusDescription(description);
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      setAnchorEl(null);
    }
  };

  if (!profile) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>
        <Typography variant="body1">
          No profile information available.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <Paper sx={{ padding: "16px", marginTop: "16px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 56, height: 56 }}>NP</Avatar>
          <Box>
            <Typography variant="h6" gutterBottom>
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="body1">
              {profile.jobTitle} @ {profile.company}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.location}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Where are you in your job search? Keep your job status up-to-date to
          inform employers of your search.
        </Typography>
        <Button
          variant="outlined"
          endIcon={<ArrowDropDownIcon />}
          onClick={handleStatusClick}
          sx={{ mt: 1 }}
        >
          {profile.status}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleStatusClose}
        >
          {statusOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() =>
                handleStatusChange(option.value, option.description)
              }
            >
              <Box>
                <Typography variant="body1">{option.value}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {option.description}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Status: {profile.status}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {statusDescription}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Profile last updated on: {profile.lastUpdated}
        </Typography>
      </Paper>
    </Container>
  );
}
