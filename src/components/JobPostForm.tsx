import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { useJobs } from "../contexts/JobContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface JobPostFormProps {
  onSubmit?: (data: JobFormData) => void;
}

export interface JobFormData {
  title: string;
  airline: string;
  location: string;
  contractType: string;
  salary: string;
  deadline: string;
  requirements: string;
  qualifications: string;
  benefits: string;
  description: string;
  howToApply: string;
  logoUrl: string;
}

const JobPostForm = ({ onSubmit: propOnSubmit }: JobPostFormProps) => {
  const { addJob } = useJobs();
  const { register, handleSubmit: formHandleSubmit } = useForm<JobFormData>();

  const onSubmitForm = async (data: JobFormData) => {
    // Convert string fields to arrays
    const formattedData = {
      ...data,
      requirements: data.requirements
        .split("\n")
        .filter((req) => req.trim() !== ""),
      qualifications: data.qualifications
        .split("\n")
        .filter((qual) => qual.trim() !== ""),
      benefits: data.benefits
        .split("\n")
        .filter((benefit) => benefit.trim() !== ""),
      logoUrl:
        data.logoUrl ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.airline)}`,
    };

    // Add the job to the context
    addJob(formattedData);

    if (propOnSubmit) {
      propOnSubmit(formattedData);
    }

    // Redirect to jobs page
    window.location.href = "/jobs";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Post a New Job</CardTitle>
        <p className="text-muted-foreground">
          Fill in the details below to post a new cabin crew position.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={formHandleSubmit(onSubmitForm)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="e.g. Senior Cabin Crew"
                {...register("title")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="airline">Airline Name</Label>
              <Input
                id="airline"
                placeholder="e.g. SkyWings Airlines"
                {...register("airline")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Dubai, UAE"
                {...register("location")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractType">Contract Type</Label>
              <Input
                id="contractType"
                placeholder="e.g. Full-time"
                {...register("contractType")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                placeholder="e.g. £45,000 - £65,000 or $45,000 - $65,000"
                {...register("salary")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input id="deadline" type="date" {...register("deadline")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              placeholder="Enter detailed job description"
              className="min-h-[150px]"
              {...register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="Enter requirements (one per line)\ne.g.:\nMinimum 3 years experience\nFluent in English\nHeight: 160-180cm\nExcellent communication skills"
              className="min-h-[100px]"
              {...register("requirements")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualifications">Qualifications</Label>
            <Textarea
              id="qualifications"
              placeholder="Enter qualifications (one per line)\ne.g.:\nHigh school diploma or equivalent\nValid passport\nNo visible tattoos\nExcellent physical fitness"
              className="min-h-[100px]"
              {...register("qualifications")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits</Label>
            <Textarea
              id="benefits"
              placeholder="Enter benefits (one per line)\ne.g.:\nCompetitive salary package\nFree accommodation\nTravel benefits for you and family\nHealth insurance\nAnnual leave with flight tickets"
              className="min-h-[100px]"
              {...register("benefits")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="howToApply">How to Apply</Label>
            <Textarea
              id="howToApply"
              placeholder="Enter application instructions\ne.g.:\nClick the Apply Now button to submit your application. Make sure you have the following documents ready:\n- Updated CV/Resume\n- Recent passport-size photo\n- Copies of certificates\n- Valid passport copy"
              className="min-h-[100px]"
              {...register("howToApply")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoUrl">Company Logo URL</Label>
            <Input
              id="logoUrl"
              placeholder="Enter URL for company logo"
              {...register("logoUrl")}
            />
          </div>

          <Button type="submit" className="w-full">
            Post Job
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobPostForm;
