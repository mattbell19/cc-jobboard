import React from "react";
import JobCard from "./JobCard";
import { NewsletterSignup } from "./NewsletterSignup";

interface Job {
  id: string;
  title: string;
  airline: string;
  location: string;
  contractType: string;
  salary: string;
  deadline: string;
  logoUrl: string;
  requirements: string[];
  description: string;
}

interface JobGridProps {
  jobs?: Job[];
}

import { useJobs } from "../contexts/JobContext";

const JobGrid = () => {
  const { jobs } = useJobs();
  return (
    <div className="w-full max-w-[1440px] mx-auto bg-gray-50 p-6">
      <div className="mb-8">
        <NewsletterSignup />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="flex justify-center">
            <JobCard
              title={job.title}
              airline={job.airline}
              location={job.location}
              contractType={job.contractType}
              salary={job.salary}
              deadline={job.deadline}
              logoUrl={job.logoUrl}
              requirements={job.requirements}
              description={job.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobGrid;
