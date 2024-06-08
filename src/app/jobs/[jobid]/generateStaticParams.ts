import { dummyJobs } from '@/utils/dummyJobsData';

export async function generateStaticParams() {
  return dummyJobs.map((job) => ({
    jobid: job.id,
  }));
}
