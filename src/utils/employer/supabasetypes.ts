import { Organization, Job, JobApplication } from './interfaces';

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: Organization;
        Insert: Omit<Organization, 'id'>;
        Update: Partial<Omit<Organization, 'id'>>;
      };
      jobs: {
        Row: Job;
        Insert: Omit<Job, 'id'>;
        Update: Partial<Omit<Job, 'id'>>;
      };
      job_applications: {
        Row: JobApplication;
        Insert: Omit<JobApplication, 'id'>;
        Update: Partial<Omit<JobApplication, 'id'>>;
      };
    };
  };
};
