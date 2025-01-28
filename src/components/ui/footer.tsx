import { Plane } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SkyCareer</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your gateway to aviation careers worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary">
                  Blog
                </a>
              </li>
              <li>
                <a href="/job/post" className="hover:text-primary">
                  Post a Job
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Career Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Interview Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  CV Templates
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@skycareer.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SkyCareer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
