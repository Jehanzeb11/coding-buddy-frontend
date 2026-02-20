"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { RegisterInputs } from "@/types/Form";
import { ArrowRight, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthImage from "@/app/assets/auth.png";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>();
  const password = watch("password");
  const onSubmit: SubmitHandler<RegisterInputs> = (data: RegisterInputs) =>
    console.log(data);

  return (
    <div className="w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Image Section - Left */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={AuthImage}
            alt="Authentication"
            width={1000}
            height={1000}
            objectFit="cover"
            className="h-full"
          />
        </div>

        {/* Form Section - Right */}
        <div className="flex-1 p-8">
          <div className="max-w-md mx-auto">
            <div className="space-y-4 mb-8">
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Create Account
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Enter your information to create your account
              </CardDescription>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "Username must not exceed 20 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Username can only contain letters, numbers, and underscores",
                    },
                  })}
                  className={
                    errors.username
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <span className="h-4 w-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">
                      !
                    </span>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <span className="h-4 w-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">
                      !
                    </span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                      },
                    })}
                    className={
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500 pr-10"
                        : "pr-10"
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <span className="h-4 w-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">
                      !
                    </span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className={
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500 pr-10"
                        : "pr-10"
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <span className="h-4 w-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">
                      !
                    </span>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </form>

            {/* <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              onClick={handleSubmit(onSubmit)}
            >
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button> */}

            <Button size="sm" type="submit" onClick={handleSubmit(onSubmit)} className="flex items-center text-sm p-5 mt-6 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 transition-all duration-300 shadow-lg hover:shadow-xl group w-full">
                <span className="transition-all duration-300 group-hover:mr-1">Create Account</span> 
                <ArrowRight className="h-5 w-5 transition-all duration-500 group-hover:translate-x-1" />
              </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
