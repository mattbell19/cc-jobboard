import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBar from "./FilterBar";
import JobGrid from "./JobGrid";
import BlogGrid from "./BlogGrid";
import { Button } from "./ui/button";
import { Navigation } from "./ui/navigation";
import { Footer } from "./ui/footer";
import { useJobs } from "../contexts/JobContext";
import {
  Plane,
  Search,
  TrendingUp,
  Users,
  Star,
  BriefcaseIcon,
} from "lucide-react";

const Home = () => {
  const { jobs: initialJobs } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);

  // Update filtered jobs when initialJobs changes
  useEffect(() => {
    setFilteredJobs(initialJobs);
  }, [initialJobs]);

  const handleFilterChange = (filters: {
    airlineType: string;
    contractLength: string;
    location: string;
  }) => {
    let filtered = [...initialJobs];

    if (filters.airlineType !== "All Airlines") {
      filtered = filtered.filter((job) =>
        job.airline.toLowerCase().includes(filters.airlineType.toLowerCase()),
      );
    }

    if (filters.contractLength !== "Any Length") {
      filtered = filtered.filter(
        (job) => job.contractType === filters.contractLength,
      );
    }

    if (filters.location !== "All Locations") {
      filtered = filtered.filter((job) => job.location === filters.location);
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white border-b overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920"
            alt="Cabin Crew"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <h1 className="text-5xl font-bold tracking-tight">
              Your Journey to the Skies Starts Here
            </h1>
            <p className="text-xl text-white/80">
              Your Gateway to 500+ Airlines Worldwide. Discover exciting cabin
              crew opportunities and take your career to new heights.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-primary font-semibold"
                asChild
              >
                <Link to="#jobs">Browse Jobs</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-primary bg-white hover:bg-white/90"
                asChild
              >
                <Link to="/airlines">View Airlines</Link>
              </Button>
            </div>
            {/* Trust badges */}
            <div className="mt-12 grid grid-cols-4 gap-8 items-center max-w-4xl mx-auto">
              {[
                "https://api.dicebear.com/7.x/initials/svg?seed=Emirates",
                "https://api.dicebear.com/7.x/initials/svg?seed=Qatar",
                "https://api.dicebear.com/7.x/initials/svg?seed=Delta",
                "https://api.dicebear.com/7.x/initials/svg?seed=BA",
              ].map((logo, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <img
                    src={logo}
                    alt="Airline logo"
                    className="w-full h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Section */}
      <div className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Join Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4 p-6 rounded-lg bg-gray-50">
              <BriefcaseIcon className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-semibold">Direct Airline Applications</h3>
              <p className="text-muted-foreground">
                Apply directly to top airlines worldwide
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-lg bg-gray-50">
              <Star className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-semibold">Free Resume Review</h3>
              <p className="text-muted-foreground">
                Get expert feedback on your CV
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-lg bg-gray-50">
              <Plane className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-semibold">Exclusive Job Alerts</h3>
              <p className="text-muted-foreground">
                Be first to know about new opportunities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <Plane className="w-8 h-8 mx-auto text-primary" />
              <div className="text-3xl font-bold">50+</div>
              <div className="text-muted-foreground">Airlines</div>
            </div>
            <div className="space-y-2">
              <Search className="w-8 h-8 mx-auto text-primary" />
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-muted-foreground">Active Jobs</div>
            </div>
            <div className="space-y-2">
              <Users className="w-8 h-8 mx-auto text-primary" />
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-muted-foreground">Cabin Crew Hired</div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <section id="jobs" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Jobs</h2>
            <p className="text-muted-foreground mt-2">
              Explore the latest cabin crew opportunities
            </p>
          </div>
          <FilterBar onFilterChange={handleFilterChange} />
          <div className="mt-8">
            <JobGrid jobs={filteredJobs} />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Cabin Crew Career Resources</h2>
            <p className="text-muted-foreground mt-2">
              Expert tips and insights for your aviation career
            </p>
          </div>
          <BlogGrid />
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Employer CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Airlines: Hire Qualified Cabin Crew Fast ✈️
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Post your job listings and reach thousands of qualified candidates
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link to="/admin/job/post">Post Jobs Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
