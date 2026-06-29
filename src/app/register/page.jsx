"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
} from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import Logo from "@/components/Logo";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import uploadImage from "@/utils/uploadImage";




export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



const onSubmit = async (data) => {
  try {
const imageFile = data.image[0]
    const imageUrl = await uploadImage(imageFile);
    console.log(imageUrl);
    

    const { data: signUpData, error } =
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageUrl,
        role: data.role,
        
      });


    if (error) {
     toast.error("Registration failed");
      return;
    }
    if (signUpData) {
  toast.success("Registration successful");
  router.push("/login");
}
  } catch (err) {
  console.error(err);
  toast.error(err.message || "Something went wrong");
}
};

  return (
    <Card className="mx-auto w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">
      <CardHeader className="flex flex-col gap-1 items-center pb-4 text-center">
        <Logo />

        <h1 className="text-3xl font-bold">
          Create an Account
        </h1>

        <p className="text-slate-400 text-sm">
          Join Ticketo to book premium events.
        </p>
      </CardHeader>

      <CardBody>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 w-full"
        >
          <div className="w-full">
            <Label htmlFor="name">Full Name</Label>

            <Input
              {...register("name", {
                required: "Name is required",
              })}
              id="name"
              placeholder="John Doe"
              startContent={<FaUser />}
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="email">Email Address</Label>

            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              id="email"
              type="email"
              placeholder="john@example.com"
              startContent={<FaEnvelope />}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="image">Profile Image URL</Label>

            <Input
              {...register("image", {
                required: "Image URL is required",
              })}
              id="image"
              type="file"
              accept="image/*"
              placeholder="https://example.com/avatar.jpg"
              startContent={<FaImage />}
            />

            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="password">Password</Label>

            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              id="password"
              type="password"
              placeholder="******"
              startContent={<FaLock />}
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="role">Select Role</Label>

           <select
  {...register("role", {
    required: "Role is required",
  })}
  className="w-full h-11 rounded-lg bg-slate-900 border border-slate-700 px-3 text-white"
>
  <option value="">Select Role</option>
  <option value="user">User</option>
  <option value="vendor">Vendor</option>
  <option value="admin">Admin</option>
</select>

            {errors.role && (
              <p className="text-red-500 text-xs mt-1">
                {errors.role.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white"
          >
            Create Account
          </Button>
        </Form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-white/10" />
          <span className="mx-3 text-xs text-slate-500">
            OR
          </span>
          <div className="flex-grow border-t border-white/10" />
        </div>

        <Button
          variant="bordered"
          className="w-full"
          startContent={<FaGoogle />}
        >
          Google OAuth
        </Button>

        <p className="text-center text-sm text-slate-400 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-pink-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}