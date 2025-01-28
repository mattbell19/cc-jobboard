import { Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { AirlineProvider } from "./contexts/AirlineContext";
import { AdminAuth } from "./components/AdminAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { JobProvider } from "./contexts/JobContext";
import { BlogProvider } from "./contexts/BlogContext";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import JobDetails from "./components/JobDetails";
import BlogPost from "./components/BlogPost";
import BlogGrid from "./components/BlogGrid";
import BlogImport from "./components/BlogImport";
import AirlineDirectory from "./components/AirlineDirectory";
import AirlineProfile from "./components/AirlineProfile";
import JobPostForm from "./components/JobPostForm";
import AdminJobDashboard from "./components/AdminJobDashboard";
import AdminAirlineDashboard from "./components/AdminAirlineDashboard";
import AirlineForm from "./components/AirlineForm";
import JobGrid from "./components/JobGrid";
import { Navigation } from "./components/ui/navigation";
import { Footer } from "./components/ui/footer";
import routes from "tempo-routes";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function App() {
  // Tempo routes need to be rendered before the app routes
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <AuthProvider>
      <JobProvider>
        <BlogProvider>
          <AirlineProvider>
            <Navigation />
            <main className="min-h-screen pt-16 pb-16">
              <Suspense fallback={<p>Loading...</p>}>
                {tempoRoutes}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/jobs"
                    element={
                      <div className="min-h-screen bg-gray-50 py-12">
                        <JobGrid />
                      </div>
                    }
                  />
                  <Route path="/job/:title" element={<JobDetails />} />
                  <Route path="/admin/auth" element={<AdminAuth />} />
                  <Route
                    path="/admin/jobs"
                    element={
                      <ProtectedRoute>
                        <AdminJobDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/job/post"
                    element={
                      <ProtectedRoute>
                        <JobPostForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/blog" element={<BlogGrid />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route
                    path="/admin/blog/import"
                    element={
                      <ProtectedRoute>
                        <BlogImport />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/airlines" element={<AirlineDirectory />} />
                  <Route path="/airlines/:slug" element={<AirlineProfile />} />
                  <Route
                    path="/admin/airlines"
                    element={
                      <ProtectedRoute>
                        <AdminAirlineDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/airline/new"
                    element={
                      <ProtectedRoute>
                        <AirlineForm />
                      </ProtectedRoute>
                    }
                  />
                  {/* Add this to handle tempo routes */}
                  {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </AirlineProvider>
        </BlogProvider>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
