import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Plane, Clock, MapPin, Filter } from "lucide-react";

interface FilterBarProps {
  onFilterChange?: (filters: {
    airlineType: string;
    contractLength: string;
    location: string;
  }) => void;
  className?: string;
}

const FilterBar = ({
  onFilterChange = () => {},
  className = "",
}: FilterBarProps) => {
  const locations = [
    "All Locations",
    "Dubai, UAE",
    "London, UK",
    "New York, USA",
    "Singapore",
    "Hong Kong",
  ];

  const airlineTypes = ["All Airlines", "Commercial", "Private", "Charter"];

  const contractLengths = [
    "Any Length",
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
  ];

  return (
    <div
      className={`w-full bg-white/80 backdrop-blur-sm border-b p-4 sticky top-16 z-10 shadow-sm ${className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center flex-1">
          <Select
            defaultValue="All Airlines"
            onValueChange={(value) =>
              onFilterChange({
                airlineType: value,
                contractLength: "Any Length",
                location: "All Locations",
              })
            }
          >
            <SelectTrigger className="w-[200px] bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
              <Plane className="w-4 h-4 mr-2 text-primary" />
              <SelectValue placeholder="Airline Type" />
            </SelectTrigger>
            <SelectContent>
              {airlineTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            defaultValue="Any Length"
            onValueChange={(value) =>
              onFilterChange({
                airlineType: "All Airlines",
                contractLength: value,
                location: "All Locations",
              })
            }
          >
            <SelectTrigger className="w-[200px] bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <SelectValue placeholder="Contract Length" />
            </SelectTrigger>
            <SelectContent>
              {contractLengths.map((length) => (
                <SelectItem key={length} value={length}>
                  {length}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            defaultValue="All Locations"
            onValueChange={(value) =>
              onFilterChange({
                airlineType: "All Airlines",
                contractLength: "Any Length",
                location: value,
              })
            }
          >
            <SelectTrigger className="w-[200px] bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          onClick={() =>
            onFilterChange({
              airlineType: "All Airlines",
              contractLength: "Any Length",
              location: "All Locations",
            })
          }
          className="border-primary/20 hover:bg-primary/5 text-primary"
        >
          <Filter className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
