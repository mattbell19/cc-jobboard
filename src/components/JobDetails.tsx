import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import {
  CalendarDays,
  MapPin,
  Building2,
  Clock,
  BriefcaseIcon,
  DollarSign,
  GraduationCap,
} from "lucide-react";

interface JobDetailsProps {
  title?: string;
  airline?: string;
  location?: string;
  contractType?: string;
  salary?: string;
  deadline?: string;
  logoUrl?: string;
  requirements?: string[];
  description?: string;
  benefits?: string[];
  qualifications?: string[];
}

import { useJobs } from "../contexts/JobContext";

const JobDetails = () => {
  const { title } = useParams();
  const { jobs } = useJobs();

  const job = jobs.find((j) => j.title === decodeURIComponent(title || ""));
  if (!job) return <div>Job not found</div>;

  return <JobDetailsContent {...job} />;
};

const JobDetailsContent = ({
  title = "Senior Cabin Crew",
  airline = "SkyWings Airlines",
  location = "Dubai, UAE",
  contractType = "Full-time",
  salary = "$45,000 - $65,000",
  deadline = "2024-05-30",
  logoUrl = "https://api.dicebear.com/7.x/initials/svg?seed=SkyWings",
  requirements = [
    "Minimum 3 years experience",
    "Fluent in English",
    "Height: 160-180cm",
    "Excellent communication skills",
  ],
  description = "Join our premium airline as a Senior Cabin Crew member. Experience luxury service at its finest while traveling the world.",
  benefits = [
    "Competitive salary package",
    "Free accommodation",
    "Travel benefits for you and family",
    "Health insurance",
    "Annual leave with flight tickets",
  ],
  qualifications = [
    "High school diploma or equivalent",
    "Valid passport",
    "No visible tattoos",
    "Excellent physical fitness",
  ],
}: JobDetailsProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white">
      {/* Header Section */}
      <div className="flex items-start gap-6 border-b pb-6">
        <img
          src={logoUrl}
          alt={`${airline} logo`}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="space-y-4 flex-1">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <Building2 className="w-5 h-5" />
              <span className="text-lg">{airline}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-sm"
            >
              <MapPin className="w-4 h-4" />
              {location}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-sm"
            >
              <BriefcaseIcon className="w-4 h-4" />
              {contractType}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-sm"
            >
              <DollarSign className="w-4 h-4" />
              {salary}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-sm"
            >
              <Clock className="w-4 h-4" />
              Apply by {deadline}
            </Badge>
          </div>
        </div>
        <Button size="lg" className="shrink-0">
          Apply Now
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {description}
            </p>
          </Card>

          {/* Requirements */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="space-y-2">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Qualifications */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Qualifications
            </h2>
            <ul className="space-y-2">
              {qualifications.map((qual, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Benefits</h2>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">How to Apply</h2>
            <p className="text-muted-foreground mb-4">
              Click the Apply Now button to submit your application. Make sure
              you have the following documents ready:
            </p>
            <ul className="space-y-2">
              <li>Updated CV/Resume</li>
              <li>Recent passport-size photo</li>
              <li>Copies of certificates</li>
              <li>Valid passport copy</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
