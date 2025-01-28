import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { useAirlines } from "../contexts/AirlineContext";

interface AirlineFormProps {
  initialData?: any;
  onSubmit?: (data: any) => void;
}

const AirlineForm = ({
  initialData,
  onSubmit: propOnSubmit,
}: AirlineFormProps) => {
  const { addAirline } = useAirlines();
  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  });

  const onSubmitForm = async (data: any) => {
    const formattedData = {
      ...data,
      fleetSize: parseInt(data.fleetSize),
      yearFounded: parseInt(data.yearFounded),
      crewCount: parseInt(data.crewCount),
      baseLocations: data.baseLocations
        .split("\n")
        .filter((loc: string) => loc.trim() !== ""),
      logo:
        data.logo ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
    };

    if (propOnSubmit) {
      propOnSubmit(formattedData);
    } else {
      addAirline(formattedData);
      window.location.href = "/airlines";
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Airline" : "Add New Airline"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Airline Name</Label>
              <Input
                id="name"
                placeholder="e.g. Virgin Atlantic"
                {...register("name")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headquarters">Headquarters</Label>
              <Input
                id="headquarters"
                placeholder="e.g. London, UK"
                {...register("headquarters")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fleetSize">Fleet Size</Label>
              <Input id="fleetSize" type="number" {...register("fleetSize")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearFounded">Year Founded</Label>
              <Input
                id="yearFounded"
                type="number"
                {...register("yearFounded")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="crewCount">Crew Count</Label>
              <Input id="crewCount" type="number" {...register("crewCount")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                placeholder="Enter logo URL (optional)"
                {...register("logo")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseLocations">Base Locations</Label>
            <Textarea
              id="baseLocations"
              placeholder="Enter base locations (one per line)\ne.g.:\nLondon Heathrow\nLondon Gatwick\nManchester"
              className="min-h-[100px]"
              {...register("baseLocations")}
            />
          </div>

          <Button type="submit" className="w-full">
            {initialData ? "Update Airline" : "Add Airline"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AirlineForm;
