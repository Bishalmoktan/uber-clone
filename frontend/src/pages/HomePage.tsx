import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background with overlay */}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold tracking-tight">RIDER</div>
          <div className="hidden md:flex items-center gap-6">
            <Link to="#" className="text-gray-300 hover:text-white transition">
              Company
            </Link>
            <Link to="#" className="text-gray-300 hover:text-white transition">
              Safety
            </Link>
            <Link to="#" className="text-gray-300 hover:text-white transition">
              Help
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-16 py-12">
          {/* Left side - Text content */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">Move with safety</h1>
            <p className="text-xl text-gray-300 max-w-md">
              Request a ride, hop in, and go. Sign in to get started or sign up
              if you're new.
            </p>
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <Link to="/user-login">Ride as User</Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Link to="/rider-login">Sign in as Driver</Link>
                </Button>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-4 text-sm">
                <Link
                  to="/user-signup"
                  className="text-gray-300 hover:text-white transition"
                >
                  Don't have an account?{" "}
                  <span className="underline">Sign up as User</span>
                </Link>
                <Link
                  to="/rider-signup"
                  className="text-gray-300 hover:text-white transition"
                >
                  <span className="underline">Register as Driver</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Card */}
          <div className="w-full md:w-1/2 max-w-md">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h2 className="font-semibold text-xl mb-4">Request a ride now</h2>
              <div className="space-y-4">
                <div className="flex items-center border-b border-gray-300 pb-2">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    className="bg-transparent flex-1 outline-none"
                  />
                </div>
                <div className="flex items-center border-b border-gray-300 pb-2">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Enter destination"
                    className="bg-transparent flex-1 outline-none"
                  />
                </div>
                <Button className="w-full bg-black hover:bg-black/80">
                  Request Now
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule for later
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>© 2024 RIDER Technologies Inc.</div>
            <div className="flex gap-4">
              <Link to="#" className="hover:text-white transition">
                Terms
              </Link>
              <Link to="#" className="hover:text-white transition">
                Privacy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
