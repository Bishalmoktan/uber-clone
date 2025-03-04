import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function RiderSignupPage() {
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
            <h1 className="text-3xl font-bold">Become a Driver</h1>
            <p className="text-gray-400 mt-2">
              Sign up to start earning with RIDER
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

            <Separator className="my-4 bg-gray-700" />

            <h3 className="font-medium text-lg">Vehicle Information</h3>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="bike">Bike</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Vehicle Color</Label>
              <Input
                id="color"
                required
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g. Black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plate">License Plate</Label>
              <Input
                id="plate"
                required
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g. ABC1234"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Vehicle Capacity</Label>
              <Input
                id="capacity"
                type="number"
                required
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g. 4"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
            >
              Register as Driver
            </Button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-400">
              Already have a driver account?{" "}
              <Link to="/rider-login" className="text-white hover:underline">
                Sign in
              </Link>
            </p>
            <Link
              to="/user-signup"
              className="block mt-2 text-gray-400 hover:text-white"
            >
              Register as a user instead
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
