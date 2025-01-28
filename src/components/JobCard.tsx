import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CalendarDays, MapPin, Building2 } from "lucide-react";

interface JobCardProps {
  title?: string;
  airline?: string;
  location?: string;
  contractType?: string;
  salary?: string;
  deadline?: string;
  logoUrl?: string;
  requirements?: string[];
  description?: string;
  isOpen?: boolean;
}

const JobCard = ({
  title = "Senior Cabin Crew",
  airline = "SkyWings Airlines",
  location = "Dubai, UAE",
  contractType = "Full-time",
  salary = "45,000 - 65,000",
  deadline = "2024-05-30",
  logoUrl = "https://api.dicebear.com/7.x/initials/svg?seed=SkyWings",
  requirements = [
    "Minimum 3 years experience",
    "Fluent in English",
    "Height: 160-180cm",
    "Excellent communication skills",
  ],
  description = "Join our premium airline as a Senior Cabin Crew member. Experience luxury service at its finest while traveling the world.",
  isOpen = false,
}: JobCardProps) => {
  return (
    <Card className="w-full max-w-[450px] bg-gradient-to-br from-white to-sky-50/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-sky-100/50">
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src={logoUrl}
            alt={`${airline} logo`}
            className="w-16 h-16 rounded-lg object-cover ring-2 ring-sky-100 bg-white p-2"
          />
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              {airline}
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </Badge>
          <Badge variant="outline">{contractType}</Badge>
          {new Date(deadline).getTime() - new Date().getTime() <
            7 * 24 * 60 * 60 * 1000 && (
            <Badge variant="destructive">Closing Soon</Badge>
          )}
          {new Date(deadline).getTime() - new Date().getTime() >
            30 * 24 * 60 * 60 * 1000 && <Badge variant="secondary">New</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{salary}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            <span>Deadline: {deadline}</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            (window.location.href = `/job/${encodeURIComponent(title)}`)
          }
        >
          View Details
        </Button>
      </CardContent>

      <CardFooter className="pt-4 flex gap-2">
        <Button
          className="flex-1 bg-primary hover:bg-primary/90"
          variant="default"
        >
          Quick Apply
        </Button>
        <Button
          className="flex-1 border-primary/20 hover:bg-primary/5 text-primary"
          variant="outline"
        >
          Save Job
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
