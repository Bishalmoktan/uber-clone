import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function UserSignupPage() {
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
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-gray-400 mt-2">
              Sign up to get started with RIDER
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
              <p className="text-xs text-gray-400">
                Must be at least 8 characters
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
            >
              Create account
            </Button>
          </form>

          <Separator className="my-6 bg-gray-700" />

          <div className="text-center mt-8">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/user-login" className="text-white hover:underline">
                Sign in
              </Link>
            </p>
            <Link
              to="/rider-signup"
              className="block mt-2 text-gray-400 hover:text-white"
            >
              Register as a driver instead
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
