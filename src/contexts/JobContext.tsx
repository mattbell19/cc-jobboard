import React, { createContext, useContext, useState } from "react";

export interface Job {
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
  qualifications: string[];
  benefits: string[];
  howToApply: string;
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

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id">) => void;
  deleteJob: (id: string) => void;
  updateJob: (id: string, job: Omit<Job, "id">) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(() => {
    // Try to get jobs from localStorage
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs
      ? JSON.parse(savedJobs)
      : [
          {
            id: "1",
            title: "Senior Cabin Crew",
            airline: "SkyWings Airlines",
            location: "Dubai, UAE",
            contractType: "Full-time",
            salary: "$45,000 - $65,000",
            deadline: "2024-05-30",
            logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=SkyWings",
            requirements: [
              "Minimum 3 years experience",
              "Fluent in English",
              "Height: 160-180cm",
              "Excellent communication skills",
            ],
            description:
              "Join our premium airline as a Senior Cabin Crew member. Experience luxury service at its finest while traveling the world.",
          },
        ];
  });

  const addJob = (newJob: Omit<Job, "id">) => {
    const jobWithId = {
      ...newJob,
      id: Math.random().toString(36).substr(2, 9),
    };
    console.log("Adding new job:", jobWithId);
    setJobs((prevJobs) => {
      const newJobs = [...prevJobs, jobWithId];
      // Save to localStorage
      localStorage.setItem("jobs", JSON.stringify(newJobs));
      console.log("Updated jobs:", newJobs);
      return newJobs;
    });
  };

  const deleteJob = (id: string) => {
    setJobs((prevJobs) => {
      const newJobs = prevJobs.filter((job) => job.id !== id);
      localStorage.setItem("jobs", JSON.stringify(newJobs));
      return newJobs;
    });
  };

  const updateJob = (id: string, updatedJob: Omit<Job, "id">) => {
    setJobs((prevJobs) => {
      const newJobs = prevJobs.map((job) =>
        job.id === id ? { ...updatedJob, id } : job,
      );
      localStorage.setItem("jobs", JSON.stringify(newJobs));
      return newJobs;
    });
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob, updateJob }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}
