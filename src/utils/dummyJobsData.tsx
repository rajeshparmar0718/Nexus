export interface Job {
    id: string;
    companyName: string;
    companyTagline?: string;
    title: string;
    salary: string;
    experience?: string;
    jobType?: string;
    visaSponsorship?: string;
    remotePolicy?: string;
    location?: string;
    hiresRemotelyIn?: string;
    preferredTimezones?: string;
    collaborationHours?: string;
    relocation?: string;
    skills?: string[];
    description?: string;
    responsibilities?: string;
    qualifications?: string;
    niceToHave?: string;
  }
  
  export const dummyJobs: Job[] = [
    {
      id: '1',
      companyName: 'Company A',
      companyTagline: 'An enterprise DevOps platform built on Nix',
      title: 'Developer Relations Engineer (AI/ML)',
      salary: '180k - 230k',
      experience: '4+',
      jobType: 'Full Time',
      visaSponsorship: 'Not Available',
      remotePolicy: 'Remote only',
      location: 'Remote • North America',
      hiresRemotelyIn: 'North America',
      preferredTimezones: 'Pacific Time, Mountain Time, Central Time, Eastern Time',
      collaborationHours: '12:00 PM - 2:00 PM Eastern Time',
      relocation: 'Not Allowed',
      skills: ['Software Development', 'Communication Skills', 'AI/ML'],
      description: 'Job description for Developer Relations Engineer at Company A.',
      responsibilities: 'Key responsibilities\n\n- Create articles, blog posts, prototypes, white papers, and examples that educate the market on the technical capabilities of Company A\n- Appear in on-stage talks, workshops, webinars, podcasts, and other available venues to promote your work\n- Study the ecosystem to identify areas of future focus, developing technical market analysis and prototypes to prove or disprove hypotheses\n- Motivate users to implement Company A in more advanced, powerful, and comprehensive ways',
      qualifications: '4+ Years of software development experience in a professional setting, with a focus on AI/ML stacks\n\n2+ Years of experience developing public-facing, educational technical content\n\nExcellent verbal, written, and visual communication skills\n\nAbility to communicate complex technical concepts to stakeholders from all walks of life\n\nAbility to write, troubleshoot, and debug code efficiently\n\nAbility to adapt to a fast-paced and dynamic work environment',
      niceToHave: 'Experience with Nix\n\nExperience with cloud platforms like AWS, GCP, or Azure\n\nExperience with DevOps and CI/CD pipelines\n\nExperience with open-source software development',
    },
    // Add more dummy jobs as needed
  ];
  
  export function populateLocalStorage() {
    localStorage.setItem('jobs', JSON.stringify(dummyJobs));
  }
  
  export function fetchJobsFromLocalStorage(role: string, city: string): Job[] {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]') as Job[];
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(role.toLowerCase()) &&
        (job.location?.toLowerCase().includes(city.toLowerCase()) ?? false)
    );
  }
  
  export function getJobById(id: string): Job | undefined {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]') as Job[];
    return jobs.find((job) => job.id === id);
  }
  
  // Applied Jobs Management
  export function addAppliedJob(jobId: string) {
    let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]') as string[];
    if (!appliedJobs.includes(jobId)) {
      appliedJobs.push(jobId);
      localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    }
  
    // Uncomment and modify the code below to store applied jobs in the backend
    /*
    fetch('/api/applied-jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobId }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Applied job stored in the backend:', data);
    })
    .catch(error => {
      console.error('Error storing applied job:', error);
    });
    */
  }
  
  export function isJobApplied(jobId: string): boolean {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]') as string[];
    return appliedJobs.includes(jobId);
  }
  
  export function fetchAppliedJobs(): Job[] {
    const appliedJobIds = JSON.parse(localStorage.getItem('appliedJobs') || '[]') as string[];
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]') as Job[];
    return jobs.filter((job) => appliedJobIds.includes(job.id));
  }
  