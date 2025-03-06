import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

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
import { useRiderRegister } from "@/hooks/user-auth";

const schema = yup.object({
  firstname: yup.string().min(3).required("First name is required"),
  lastname: yup.string().optional(),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  vehicleColor: yup.string().min(3).required("Vehicle color is required"),
  vehiclePlate: yup
    .string()
    .min(3)
    .required("Vehicle plate number is required"),
  vehicleCapacity: yup.string().min(1).required("Vehicle capacity is required"),
  vehicleType: yup
    .mixed<"car" | "motorcycle" | "auto">()
    .oneOf(
      ["car", "motorcycle", "auto"],
      "Vehicle type must be 'car', 'motorcycle', or 'auto'"
    )
    .required("Vehicle type is required"),
});

export type RegisterRiderType = yup.InferType<typeof schema>;

export default function RiderSignupPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterRiderType>({
    resolver: yupResolver(schema),
  });

  const { mutate: registerRider, isPending } = useRiderRegister();

  const onSubmit = (data: RegisterRiderType) => {
    registerRider(data);
  };

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

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  {...register("firstname")}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <p className="text-red-500">{errors.firstname?.message}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  {...register("lastname")}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="name@example.com"
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>

            <Separator className="my-4 bg-gray-700" />

            <h3 className="font-medium text-lg">Vehicle Information</h3>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "vehicleType",
                    value as "car" | "motorcycle" | "auto"
                  )
                }
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{errors.vehicleType?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleColor">Vehicle Color</Label>
              <Input
                id="vehicleColor"
                {...register("vehicleColor")}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g. Black"
              />
              <p className="text-red-500">{errors.vehicleColor?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehiclePlate">License Plate</Label>
              <Input
                id="vehiclePlate"
                {...register("vehiclePlate")}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g. ABC1234"
              />
              <p className="text-red-500">{errors.vehiclePlate?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleCapacity">Vehicle Capacity</Label>
              <Input
                id="vehicleCapacity"
                type="number"
                {...register("vehicleCapacity")}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g. 4"
              />
              <p className="text-red-500">{errors.vehicleCapacity?.message}</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
              disabled={isPending}
            >
              {isPending ? "Registering..." : "Register as Driver"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
