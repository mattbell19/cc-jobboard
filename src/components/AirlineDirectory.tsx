import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export interface Airline {
  id: string;
  name: string;
  slug: string;
  logo: string;
  headquarters: string;
  fleetSize: number;
  yearFounded: number;
  crewCount: number;
  baseLocations: string[];
}

interface AirlineDirectoryProps {
  airlines?: Airline[];
}

const AirlineDirectory = ({
  airlines = [
    {
      id: "1",
      name: "Virgin Atlantic",
      slug: "virgin-atlantic",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=VA",
      headquarters: "Crawley, United Kingdom",
      fleetSize: 37,
      yearFounded: 1984,
      crewCount: 5500,
      baseLocations: ["London Heathrow", "London Gatwick", "Manchester"],
    },
    {
      id: "2",
      name: "Emirates",
      slug: "emirates",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=EM",
      headquarters: "Dubai, UAE",
      fleetSize: 262,
      yearFounded: 1985,
      crewCount: 21000,
      baseLocations: ["Dubai International"],
    },
    // Add more airlines here
  ],
}: AirlineDirectoryProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="mb-12 space-y-6">
        <h1 className="text-4xl font-bold text-center">Airline Directory</h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
          Comprehensive information about airlines, their cabin crew
          requirements, and career opportunities.
        </p>
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search airlines..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {airlines.map((airline) => (
          <Link key={airline.id} to={`/airlines/${airline.slug}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-sky-50 border-sky-100/50">
              <CardHeader className="flex flex-row items-center gap-4">
                <img
                  src={airline.logo}
                  alt={`${airline.name} logo`}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold">{airline.name}</h2>
                  <p className="text-muted-foreground">
                    {airline.headquarters}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Fleet Size</dt>
                    <dd className="font-medium">
                      {airline.fleetSize} aircraft
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Cabin Crew</dt>
                    <dd className="font-medium">
                      {airline.crewCount.toLocaleString()}+
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Founded</dt>
                    <dd className="font-medium">{airline.yearFounded}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Main Base</dt>
                    <dd className="font-medium">{airline.baseLocations[0]}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AirlineDirectory;
