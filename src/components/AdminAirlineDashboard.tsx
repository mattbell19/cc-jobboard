import React, { useState } from "react";
import { useAirlines } from "../contexts/AirlineContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Pencil, Trash2, Search } from "lucide-react";
import AirlineForm from "./AirlineForm";

const AdminAirlineDashboard = () => {
  const { airlines, deleteAirline, updateAirline } = useAirlines();
  const [search, setSearch] = useState("");
  const [editingAirline, setEditingAirline] = useState<any>(null);

  const filteredAirlines = airlines.filter(
    (airline) =>
      airline.name.toLowerCase().includes(search.toLowerCase()) ||
      airline.headquarters.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this airline?")) {
      deleteAirline(id);
    }
  };

  const handleEdit = (airline: any) => {
    setEditingAirline(airline);
  };

  const handleUpdate = (updatedAirline: any) => {
    updateAirline(editingAirline.id, updatedAirline);
    setEditingAirline(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Airlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search airlines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button asChild>
              <a href="/admin/airline/new">Add New Airline</a>
            </Button>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Headquarters</TableHead>
                  <TableHead>Fleet Size</TableHead>
                  <TableHead>Crew Count</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAirlines.map((airline) => (
                  <TableRow key={airline.id}>
                    <TableCell className="font-medium">
                      {airline.name}
                    </TableCell>
                    <TableCell>{airline.headquarters}</TableCell>
                    <TableCell>{airline.fleetSize}</TableCell>
                    <TableCell>{airline.crewCount}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(airline)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Airline</DialogTitle>
                            </DialogHeader>
                            <AirlineForm
                              initialData={airline}
                              onSubmit={handleUpdate}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(airline.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAirlineDashboard;
