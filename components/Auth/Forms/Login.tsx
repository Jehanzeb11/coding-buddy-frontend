"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { LoginInputs } from "@/types/Form";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthImage from "@/app/assets/auth.png";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/app/actions/auth";

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    setIsPending(true);
    const result = await loginAction(data);
    setIsPending(false);

    if (result.success) {
      toast.success(result.message);
      // Brief delay for the toast before navigating
      setTimeout(() => {
        router.push("/chat");
        router.refresh(); // Refresh the server-side state (including cookies)
      }, 1000);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto shadow-2xl dark:shadow-none rounded-2xl overflow-hidden bg-white/90 dark:bg-white/5 dark:backdrop-blur-2xl border border-gray-200 dark:border-white/10 relative">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-violet-500/5 dark:via-transparent dark:to-fuchsia-500/5 pointer-events-none" />
      <div className="flex flex-col md:flex-row relative z-10">
        {/* Image Section - Left */}
        <div className="flex-1 h-full flex items-center justify-center p-6 md:p-8 lg:p-12">
          <div className="relative w-full aspect-square max-w-md mx-auto">
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
            <div className="space-y-4 mb-10">
              <CardTitle className="text-3xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-base text-gray-500 dark:text-gray-400">
                Enter your credentials to access your account
              </CardDescription>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
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
                  className={`h-12 bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-indigo-500 dark:focus-visible:ring-violet-500 rounded-xl transition-all ${
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
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
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
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                    className={`h-12 bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-indigo-500 dark:focus-visible:ring-violet-500 rounded-xl transition-all pr-12 ${
                      errors.password
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1.5 h-9 w-9 p-0 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-gray-400 dark:text-gray-400"
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
            </form>

            <Button
              size="lg"
              type="submit"
              disabled={isPending || isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="flex items-center justify-center h-14 mt-8 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl shadow-xl hover:shadow-indigo-500/25 dark:shadow-violet-500/20 dark:hover:shadow-violet-500/40 transition-all duration-300 hover:-translate-y-0.5 group w-full disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-lg font-medium"
            >
              <span className="transition-all duration-300 group-hover:mr-1">
                {isPending || isSubmitting ? "Signing In..." : "Sign In"}
              </span>
              {!isPending && !isSubmitting && (
                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
              )}
            </Button>

            <div className="mt-8 text-center pt-6 border-t border-gray-100 dark:border-white/5">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-indigo-600 hover:text-indigo-700 dark:text-violet-400 dark:hover:text-violet-300 font-semibold transition-colors"
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
