/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/user-auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

export default function UserLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate: loginUser, isPending } = useLogin();

  const onSubmit = (data: any) => {
    loginUser(data);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="container mx-auto px-4 py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          RIDER
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/user-signup" className="text-white hover:underline">
              Create account
            </Link>
          </p>
          <Link
            to="/rider-login"
            className="block mt-2 text-gray-400 hover:text-white"
          >
            Sign in as a driver instead
          </Link>
        </div>
      </main>
    </div>
  );
}
