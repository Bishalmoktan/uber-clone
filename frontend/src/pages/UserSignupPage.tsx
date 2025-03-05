/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegister } from "@/hooks/user-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const schema = yup.object({
  firstname: yup.string().min(3).required("First name is required"),
  lastname: yup.string().min(3).optional(),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

export default function UserSignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate: registerUser, isPending } = useRegister();

  const onSubmit = (data: any) => {
    registerUser({
      fullname: { firstname: data.firstname, lastname: data.lastname },
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="container mx-auto px-4 py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          RIDER
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" {...register("firstname")} />
              <p className="text-red-500">{errors.firstname?.message}</p>
            </div>

            <div>
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" {...register("lastname")} />
            </div>

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
              {isPending ? "Signing up..." : "Sign up"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
