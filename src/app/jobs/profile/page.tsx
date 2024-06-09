'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tab, Tabs, Avatar, Button, TextField, Divider, Paper, Modal, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ResumeCVTab from '@/components/ResumeCVTab';
import { saveUserProfile, getUserProfile, UserProfile, Education, WorkExperience } from '@/utils/dummyUserProfileData';

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postalcode: '',
    contactNumber: null,
    city: '',
    state: '',
    country: '',
    linkedIn: '',
    github: '',
    website: '',
    twitter: '',
    education: [],
    workExperience: [],
    resume: null,
    image: null,
    primaryRole: '',
    yearsOfExperience: '',
    openRoles: '',
    bio: '',
    skills: [], // Initialize skills as an empty array
    resumeVideo : null,
  });

  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    universityName: '',
    courseName: '',
    degree: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
  });
  const [currentExperience, setCurrentExperience] = useState<WorkExperience>({
    companyName: '',
    title: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: '',
  });

  const [activeTab, setActiveTab] = useState(0);
  const [resumeReview, setResumeReview] = useState(false);

  useEffect(() => {
    const savedProfile = getUserProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: value.split(',').map((skill) => skill.trim()),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prevProfile) => ({ ...prevProfile, [name]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEducation = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      education: [...(prevProfile.education || []), currentEducation],
    }));
    setEducationModalOpen(false);
    setCurrentEducation({
      universityName: '',
      courseName: '',
      degree: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
    });
  };

  const handleAddExperience = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      workExperience: [...(prevProfile.workExperience || []), currentExperience],
    }));
    setExperienceModalOpen(false);
    setCurrentExperience({
      companyName: '',
      title: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile(profile);
    alert('Profile saved successfully!');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit your Nexus profile
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Overview" />
        <Tab label="Profile" />
        <Tab label="Resume / CV" />
        <Tab label="Preferences" />
        <Tab label="Culture" />
      </Tabs>
      <Divider sx={{ my: 2 }} />
      {activeTab === 0 && (
        <Box>
          <Typography variant="h6">What recruiters will see</Typography>
          {/* Add content for the Overview tab here */}
        </Box>
      )}
      {activeTab === 1 && (
        <Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar src={profile.image || ''} sx={{ width: 56, height: 56 }} />
                <Button variant="contained" component="label">
                  Upload a new photo
                  <input type="file" name="image" hidden onChange={handleFileChange} />
                </Button>
              </Box>
              <TextField
                label="Your name"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Where are you based?"
                name="city"
                value={profile.city}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Select your primary role"
                name="primaryRole"
                value={profile.primaryRole}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Years of experience"
                name="yearsOfExperience"
                value={profile.yearsOfExperience}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Open to the following roles"
                name="openRoles"
                value={profile.openRoles}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Your bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Box>
          </form>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Social Profiles</Typography>
            <TextField
              label="Website"
              name="website"
              value={profile.website}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="LinkedIn"
              name="linkedIn"
              value={profile.linkedIn}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="GitHub"
              name="github"
              value={profile.github}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Twitter"
              name="twitter"
              value={profile.twitter}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Your work experience</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setExperienceModalOpen(true)}>
              Add work experience
            </Button>
            {profile.workExperience?.map((exp, index) => (
              <Paper key={index} sx={{ padding: '16px', marginTop: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6">{exp.companyName}</Typography>
                    <Typography>{exp.title}</Typography>
                    <Typography>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</Typography>
                    <Typography>{exp.description}</Typography>
                  </Box>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Education</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setEducationModalOpen(true)}>
              Add education
            </Button>
            {profile.education?.map((edu, index) => (
              <Paper key={index} sx={{ padding: '16px', marginTop: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6">{edu.universityName}</Typography>
                    <Typography>{edu.courseName} - {edu.degree}</Typography>
                    <Typography>{edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}</Typography>
                  </Box>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Your Skills</Typography>
            <TextField
              label="Your Skills"
              name="skills"
              value={profile.skills?.join(', ')} // Handle undefined skills
              onChange={handleSkillsChange}
              fullWidth
              placeholder="e.g. Python, React"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 4, alignSelf: 'flex-end' }} // Align the save button to the right and add margin top for spacing
            onClick={handleSubmit} // Ensure the button triggers the form submission
          >
            Save Profile
          </Button>
        </Box>
      )}
      {activeTab === 2 && (
        <ResumeCVTab profile={profile} setProfile={setProfile} />
      )}
      <Modal open={educationModalOpen} onClose={() => setEducationModalOpen(false)}>
        <Box sx={{ padding: '16px', backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
          <Typography variant="h6">Add Education</Typography>
          <TextField
            label="University Name"
            name="universityName"
            value={currentEducation.universityName}
            onChange={(e) => setCurrentEducation({ ...currentEducation, universityName: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Course Name"
            name="courseName"
            value={currentEducation.courseName}
            onChange={(e) => setCurrentEducation({ ...currentEducation, courseName: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Degree"
            name="degree"
            value={currentEducation.degree}
            onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={currentEducation.startDate}
            onChange={(e) => setCurrentEducation({ ...currentEducation, startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          {!currentEducation.currentlyStudying && (
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={currentEducation.endDate}
              onChange={(e) => setCurrentEducation({ ...currentEducation, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={currentEducation.currentlyStudying}
                onChange={(e) => setCurrentEducation({ ...currentEducation, currentlyStudying: e.target.checked })}
              />
            }
            label="Currently Studying"
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginTop: 2 }}>
            <Button variant="contained" onClick={handleAddEducation}>Add</Button>
            <Button variant="outlined" onClick={() => setEducationModalOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={experienceModalOpen} onClose={() => setExperienceModalOpen(false)}>
        <Box sx={{ padding: '16px', backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
          <Typography variant="h6">Add Work Experience</Typography>
          <TextField
            label="Company Name"
            name="companyName"
            value={currentExperience.companyName}
            onChange={(e) => setCurrentExperience({ ...currentExperience, companyName: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Title"
            name="title"
            value={currentExperience.title}
            onChange={(e) => setCurrentExperience({ ...currentExperience, title: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={currentExperience.startDate}
            onChange={(e) => setCurrentExperience({ ...currentExperience, startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          {!currentExperience.currentlyWorking && (
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={currentExperience.endDate}
              onChange={(e) => setCurrentExperience({ ...currentExperience, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={currentExperience.currentlyWorking}
                onChange={(e) => setCurrentExperience({ ...currentExperience, currentlyWorking: e.target.checked })}
              />
            }
            label="Currently Working"
          />
          <TextField
            label="Description"
            name="description"
            value={currentExperience.description}
            onChange={(e) => setCurrentExperience({ ...currentExperience, description: e.target.value })}
            multiline
            rows={4}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginTop: 2 }}>
            <Button variant="contained" onClick={handleAddExperience}>Add</Button>
            <Button variant="outlined" onClick={() => setExperienceModalOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
