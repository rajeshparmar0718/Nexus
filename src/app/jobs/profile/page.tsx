'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tab, Tabs, Divider, Paper, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PersonalDetailsForm from '@/components/Profile/PersonalDetailsForm';
import SocialProfilesForm from '@/components/Profile/SocialProfilesForm';
import SkillsForm from '@/components/Profile/SkillsForm';
import EducationForm from '@/components/Profile/EducationForm';
import ExperienceForm from '@/components/Profile/ExperienceForm';

import { useSupabase } from '@/context/SupabaseAuthProvider';
import { useRouter } from 'next/navigation';
import { Education, UserProfile, WorkExperience } from '@/utils/dummyUserProfileData';
import ResumeCVTab from '@/components/ResumeCVTab';

export default function Profile() {
  const { session, supabase } = useSupabase();
  const router = useRouter();
  const user = session?.user;

  const [profile, setProfile] = useState<UserProfile>({
    user_id: user?.id || '',
    email: user?.email || '',
    firstName: '',
    lastName: '',
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
    resume: [],
    selectedResume: null,
    image: null,
    primaryRole: '',
    yearsOfExperience: '',
    openRoles: '',
    bio: '',
    skills: [],
    resumeVideo: [],
  });

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
  const [addingEducation, setAddingEducation] = useState(false);
  const [addingExperience, setAddingExperience] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<Blob | null>(null);

  useEffect(() => {
    if (user) {
      checkIfProfileExists(user.id);
    }
  }, [user]);

  const checkIfProfileExists = async (user_id: string | any) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('user_id', user_id)
        .single();

      if (data) {
        setIsExistingUser(true);
        fetchProfile(data.user_id);
      } else {
        setIsExistingUser(false);
      }

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking profile existence:', error.message);
      }
    } catch (error) {
      console.error('Failed to check profile existence:', error);
    }
  };

  const fetchProfile = async (user_id: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user_id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

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
    setAddingEducation(false);
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
    setAddingExperience(false);
    setCurrentExperience({
      companyName: '',
      title: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile, { onConflict: 'user_id' });

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert('Profile saved successfully!');
    }
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
            <PersonalDetailsForm profile={profile} handleChange={handleChange} handleFileChange={handleFileChange} />
          </form>
          <SocialProfilesForm profile={profile} handleChange={handleChange} />
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Your work experience</Typography>
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
            {addingExperience && (
              <ExperienceForm
                experience={currentExperience}
                setExperience={setCurrentExperience}
                handleAddExperience={handleAddExperience}
                setAddingExperience={setAddingExperience}
              />
            )}
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddingExperience(true)}>
              Add work experience
            </Button>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Education</Typography>
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
            {addingEducation && (
              <EducationForm
                education={currentEducation}
                setEducation={setCurrentEducation}
                handleAddEducation={handleAddEducation}
                setAddingEducation={setAddingEducation}
              />
            )}
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddingEducation(true)}>
              Add education
            </Button>
          </Box>
          <SkillsForm profile={profile} handleSkillsChange={handleSkillsChange} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 4, alignSelf: 'flex-end' }}
            onClick={handleSubmit}
          >
            Save Profile
          </Button>
        </Box>
      )}
      {activeTab === 2 && (
        <ResumeCVTab
          profile={profile}
          setProfile={setProfile}
          recordedVideo={recordedVideo}
          setRecordedVideo={setRecordedVideo}
        />
      )}
    </Container>
  );
}
