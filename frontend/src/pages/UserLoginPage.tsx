import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function UserLoginPage() {
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
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-400 mt-2">
              Sign in to your account to continue
            </p>
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
              Sign in
            </Button>
          </form>

          <Separator className="my-6 bg-gray-700" />

          <div className="text-center mt-8">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/user-signup" className="text-white hover:underline">
                Create account
              </Link>
            </p>
            <Link
              to="/rider/login"
              className="block mt-2 text-gray-400 hover:text-white"
            >
              Sign in as a driver instead
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
