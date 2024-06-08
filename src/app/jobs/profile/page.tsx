'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, Avatar, Checkbox, FormControlLabel, Modal } from '@mui/material';
import { saveUserProfile, getUserProfile, UserProfile, Education, WorkExperience } from '@/utils/dummyUserProfileData';

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contactNumber: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile(profile);
    alert('Profile saved successfully!');

    // Future Implementation:
    // When ready to connect to a backend API, replace the above local storage save with an API call
    // Example:
    // fetch('/api/saveProfile', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(profile),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle success
    //     console.log('Profile saved to backend:', data);
    //   })
    //   .catch(error => {
    //     // Handle error
    //     console.error('Error saving profile to backend:', error);
    //   });
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

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit your Nexus profile
      </Typography>
      <Paper sx={{ padding: '16px', marginTop: '16px', marginBottom: '16px' }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Contact Number"
                name="contactNumber"
                value={profile.contactNumber}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="City"
                name="city"
                value={profile.city}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="State"
                name="state"
                value={profile.state}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Country"
                name="country"
                value={profile.country}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="LinkedIn"
                name="linkedIn"
                value={profile.linkedIn}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="GitHub"
                name="github"
                value={profile.github}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Website"
                name="website"
                value={profile.website}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Twitter"
                name="twitter"
                value={profile.twitter}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Typography variant="h6" component="div" sx={{ marginTop: '16px' }}>
              Education
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={() => setEducationModalOpen(true)}>
                Add Education
              </Button>
            </Box>
            {profile.education?.map((edu, index) => (
              <Paper key={index} sx={{ padding: '16px', marginTop: '16px' }}>
                <Typography variant="h6">{edu.universityName}</Typography>
                <Typography>{edu.courseName} - {edu.degree}</Typography>
                <Typography>{edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}</Typography>
              </Paper>
            ))}
            <Typography variant="h6" component="div" sx={{ marginTop: '16px' }}>
              Work Experience
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={() => setExperienceModalOpen(true)}>
                Add Work Experience
              </Button>
            </Box>
            {profile.workExperience?.map((exp, index) => (
              <Paper key={index} sx={{ padding: '16px', marginTop: '16px' }}>
                <Typography variant="h6">{exp.companyName}</Typography>
                <Typography>{exp.title}</Typography>
                <Typography>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</Typography>
                <Typography>{exp.description}</Typography>
              </Paper>
            ))}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button variant="contained" component="label">
                Upload Resume
                <input
                  type="file"
                  name="resume"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {profile.resume && <Typography>Resume Uploaded</Typography>}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar src={profile.image || ''} sx={{ width: 56, height: 56 }} />
              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  name="image"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Save Profile
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Education Modal */}
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

      {/* Experience Modal */}
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
