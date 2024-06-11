// interfaces.ts

export interface Organization {
    id: string;
    name: string;
    description: string;
    user_id: string;
  }
  
  export interface Job {
    id: string;
    title: string;
    description: string;
    due_date: string;
    organization_id: string;
    user_id: string;
  }
  
  export interface JobApplication {
    id: string;
    user_id: string;
    job_id: string;
    resume: string;
    video_url: string;
  }
  