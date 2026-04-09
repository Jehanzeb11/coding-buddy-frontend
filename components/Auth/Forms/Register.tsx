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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerAction } from "@/app/actions/auth";

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>();
  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterInputs> = async (
    data: RegisterInputs,
  ) => {
    const { confirmPassword, ...userData } = data;

    setIsPending(true);
    const result = await registerAction(userData);
    setIsPending(false);

    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto shadow-2xl dark:shadow-none rounded-2xl overflow-hidden bg-white/90 dark:bg-white/5 dark:backdrop-blur-2xl border border-gray-200 dark:border-white/10 relative mt-8 lg:mt-0">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-violet-500/5 dark:via-transparent dark:to-fuchsia-500/5 pointer-events-none" />
      <div className="flex flex-col md:flex-row relative z-10">
        {/* Image Section - Left (Hidden on very small screens or given proper padding) */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8 lg:p-12">
          <div className="relative w-full aspect-square max-w-md mx-auto hidden md:block">
            <Image
              src={AuthImage}
              alt="Authentication"
              fill
              priority
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Form Section - Right */}
        <div className="flex-1 p-8 md:p-12 bg-white/50 dark:bg-black/20 backdrop-blur-sm border-l border-gray-100 dark:border-white/5 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="space-y-4 mb-8">
              <CardTitle className="text-3xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight">
                Create Account
              </CardTitle>
              <CardDescription className="text-center text-base text-gray-500 dark:text-gray-400">
                Join our community and step up your development
              </CardDescription>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <User className="h-4 w-4 text-indigo-500 dark:text-violet-400" />
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
                  className={`h-11 bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-indigo-500 dark:focus-visible:ring-violet-500 rounded-xl transition-all ${
                    errors.username
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.username && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
                      !
                    </span>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <Mail className="h-4 w-4 text-indigo-500 dark:text-violet-400" />
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
                  className={`h-11 bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-indigo-500 dark:focus-visible:ring-violet-500 rounded-xl transition-all ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
                      !
                    </span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <Lock className="h-4 w-4 text-indigo-500 dark:text-violet-400" />
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
                          "Requires uppercase, lowercase, number, and special character",
                      },
                    })}
                    className={`h-11 bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-indigo-500 dark:focus-visible:ring-violet-500 rounded-xl transition-all pr-12 ${
                      errors.password
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
                      !
                    </span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <Lock className="h-4 w-4 text-indigo-500 dark:text-violet-400" />
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
                    className={`h-11 bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-indigo-500 dark:focus-visible:ring-violet-500 rounded-xl transition-all pr-12 ${
                      errors.confirmPassword
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
                      !
                    </span>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </form>

            <Button
              size="lg"
              type="submit"
              disabled={isPending || isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="flex items-center justify-center h-14 mt-8 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl shadow-xl hover:shadow-indigo-500/25 dark:shadow-violet-500/20 dark:hover:shadow-violet-500/40 transition-all duration-300 hover:-translate-y-0.5 group w-full disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-lg font-medium"
            >
              <span className="transition-all duration-300 group-hover:mr-1">
                {isPending || isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </span>
              {!isPending && !isSubmitting && (
                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
              )}
            </Button>

            <div className="mt-8 text-center pt-6 border-t border-gray-100 dark:border-white/5">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-700 dark:text-violet-400 dark:hover:text-violet-300 font-semibold transition-colors"
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
