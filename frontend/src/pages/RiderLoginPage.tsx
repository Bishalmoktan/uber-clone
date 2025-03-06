import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRiderLogin } from "@/hooks/user-auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

export default function RiderLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate: loginRider, isPending } = useRiderLogin();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    loginRider(data);
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
      <main className="flex-1 text-center flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Driver Sign In</h1>
            <p className="text-gray-400 mt-2">Sign in to your driver account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" {...register("password")} />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Separator className="my-6 bg-gray-700" />

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
