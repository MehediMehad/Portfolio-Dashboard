"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/login";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/actions/AuthService";

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { setIsLoading } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setError(null);
      setIsLoading(true);
      const res = await loginUser(data);

      if (res?.success) {
        toast.success(res.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        setError(res.message || "Login failed. Please try again.");
        toast.error(res.message || "Something went wrong!");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
      toast.error("An unexpected error occurred!");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Login form */}
        <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6">
          {/* Logo and heading */}
          <div className="flex flex-col text-center mb-8 items-center justify-center">
            <Link href="/" className="text-textPrimary">
              <svg
                width="48"
                height="48"
                viewBox="0 0 120 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 80V20H20L40 60L60 20H70L90 60L110 20H120V80H110V40L90 80H80L60 40L40 80H30L10 40V80H10Z"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <div className="">
              <h1 className="text-white text-2xl font-bold">Welcome Back</h1>
              <p className="text-gray-400 mt-2">
                Sign in to access your dashboard
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Address */}
            <div className="mb-6">
              {/* label */}
              <label
                htmlFor="email"
                className="block text-gray-300 mb-2 text-sm font-medium"
              >
                Email Address
              </label>
              {/* input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
              </div>
              {/* error */}
              {form.formState.errors.email && (
                <p className="mt-1 text-red-400 text-sm">
                  {form.formState.errors.email.message as string}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="mb-6">
              {/* label */}
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="text-gray-300 text-sm font-medium"
                >
                  Password
                </label>
                {/* Forgot password Page */}
                <Link
                  href="/forgot-password"
                  className="text-[#a855f7] text-sm hover:text-[#c084fc] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              {/* input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {/* error */}
              {form.formState.errors.password && (
                <p className="mt-1 text-red-400 text-sm">
                  {form.formState.errors.password.message as string}
                </p>
              )}
            </div>

            {/* REMEMBER ME */}
            {/* <div className="flex items-center mb-6">
              <input
                id="remember-me"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 rounded border-[#2d1b4d] bg-[#1a1025] text-[#a855f7] focus:ring-[#a855f7] focus:ring-offset-[#120b20]"
                disabled={isSubmitting}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div> */}

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
