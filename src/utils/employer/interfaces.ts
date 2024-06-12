import { PostgrestError } from "@supabase/supabase-js";

// interfaces.ts
export interface JobDetails {
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
  createdBy?: string;
}

export type SupabaseInsertResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};

export interface Organization {
  id?: string;
  name: string;
  tagline?: string;
  description: string;
  createdBy?: string;
}

export interface JobApplication {
  id: string;
  user_id: string;
  job_id: string;
  resume: string;
  video_url: string;
}
