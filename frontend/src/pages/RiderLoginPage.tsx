import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function RiderLoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          RIDER
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Driver Sign In</h1>
            <p className="text-gray-400 mt-2">Sign in to your driver account</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-sm text-gray-400 hover:text-white">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
            >
              Sign in as Driver
            </Button>
          </form>

          <Separator className="my-6 bg-gray-700" />

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full border-gray-700 hover:bg-gray-800"
            >
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-700 hover:bg-gray-800"
            >
              Continue with Apple
            </Button>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400">
              Don't have a driver account?{" "}
              <Link to="/rider-signup" className="text-white hover:underline">
                Register as driver
              </Link>
            </p>
            <Link
              to="/user-login"
              className="block mt-2 text-gray-400 hover:text-white"
            >
              Sign in as a user instead
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
