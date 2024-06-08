export interface Education {
    universityName: string;
    courseName: string;
    degree: string;
    startDate: string;
    endDate?: string;
    currentlyStudying: boolean;
  }
  
  export interface WorkExperience {
    companyName: string;
    title: string;
    startDate: string;
    endDate?: string;
    currentlyWorking: boolean;
    description: string;
  }
  
  export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    contactNumber: string;
    city: string;
    state: string;
    country: string;
    linkedIn: string;
    github: string;
    website: string;
    twitter: string;
    education: Education[];
    workExperience: WorkExperience[];
    resume: string | null;
    image: string | null;
  }
  
  export function saveUserProfile(profile: UserProfile) {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }
  
  export function getUserProfile(): UserProfile | null {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  }
  