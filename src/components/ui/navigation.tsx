import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Plane, BookOpen, MapPin, BriefcaseIcon, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function Navigation() {
  return (
    <div className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Cabin Crew Jobs</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="flex items-center space-x-8">
            <Link
              to="/jobs"
              className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
            >
              <BriefcaseIcon className="h-4 w-4" />
              <span>Latest Jobs</span>
            </Link>

            <Link
              to="/airlines"
              className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
            >
              <Plane className="h-4 w-4" />
              <span>Airlines</span>
            </Link>

            <Link
              to="/blog"
              className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Career Tips</span>
            </Link>

            {/* Admin Section */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/admin/job/post" className="w-full">
                    Post a Job
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/blog/import" className="w-full">
                    Import Blog Posts
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </div>
  );
}
