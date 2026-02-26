"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { LoginInputs, LoginResponse } from "@/types/Form";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthImage from "@/app/assets/auth.png";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLogin } from "@/hooks/useLogin";

const LoginForm: React.FC = () => {

  const router = useRouter();
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data: LoginInputs) =>{
    loginMutation.mutate(data, {
      onSuccess: (response: LoginResponse) => {
        toast.success(response.message || "Login successful");
        setTimeout(() => {
          router.push(`/chat`);
        }, 2000);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Login failed. Please try again.");
      },
    });
  }

  return (
  <div className="w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white dark:bg-[#071024] dark:shadow-[0_20px_40px_rgba(7,18,36,0.7)] border border-transparent dark:border-neutral-800">
      <div className="flex flex-col md:flex-row">
        {/* Image Section - Left */}
        <div className="flex-1 h-full flex items-center justify-center">
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
        <div className="flex-1 p-8 bg-white dark:bg-transparent">
          <div className="max-w-md mx-auto">
            <div className="space-y-4 mb-8">
              <CardTitle className="text-2xl font-bold text-center dark:text-[#e6eef8]">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center dark:text-[#cfe6ff]">
                Enter your credentials to access your account
              </CardDescription>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2 dark:text-[#cfe6ff]">
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
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2 dark:text-[#cfe6ff]">
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
                        value: 6,
                        message: "Password must be at least 6 characters long",
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
                      <EyeOff className="h-4 w-4 text-gray-500 dark:text-[#cbd6e8]" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500 dark:text-[#cbd6e8]" />
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
            </form>

             <Button
              size="sm"
              type="submit"
              disabled={loginMutation.isPending || isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="flex items-center text-sm p-5 mt-6 cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-[#7c3aed] dark:to-[#8b5cf6] text-white border-0 transition-all duration-300 shadow-lg hover:shadow-xl group w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="transition-all duration-300 group-hover:mr-1">
                {loginMutation.isPending || isSubmitting ? "Signing In..." : "Sign In"}
              </span>
              {!loginMutation.isPending && !isSubmitting && (
                <ArrowRight className="h-5 w-5 transition-all duration-500 group-hover:translate-x-1" />
              )}
            </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-[#cfe6ff]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors dark:text-[#9b7cf8] dark:hover:text-[#d4b9ff]"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
