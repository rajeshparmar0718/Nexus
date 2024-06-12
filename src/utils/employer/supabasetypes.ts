import { Organization, JobDetails, JobApplication } from "./interfaces";

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: Organization;
        Insert: Omit<Organization, "id">;
        Update: Partial<Omit<Organization, "id">>;
      };
      jobs: {
        Row: JobDetails;
        Insert: Omit<JobDetails, "id">;
        Update: Partial<Omit<JobDetails, "id">>;
      };
      job_applications: {
        Row: JobApplication;
        Insert: Omit<JobApplication, "id">;
        Update: Partial<Omit<JobApplication, "id">>;
      };
    };
  };
};
