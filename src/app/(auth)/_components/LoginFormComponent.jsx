"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useToast } from "@/app/context/ToastContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations";

export default function LoginFormComponent() {
  const [submitError, setSubmitError] = useState("");
  const { addToast } = useToast();
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmitError(""); 
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
      
      addToast({
        title: "Login Success",
        description: "Your order products are ready. You have 0 items in your cart.",
        color: "success",
      });

      // Use window.location for full page reload to avoid RSC payload issues
      window.location.href = "/";
      
    } catch (error) {
      
      addToast({
        title: "Login Failed",
        description: "Invalid email or password",
        color: "danger",
      });
      setSubmitError("Invalid credentials. Please try again.");
    }
  };

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {submitError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {submitError}
        </div>
      )}
      
      
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          {...register("email")}
          className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ring-lime-400/20 focus:ring-2 ${
            errors.email ? "border-rose-500 focus:border-rose-500" : "border-gray-200 focus:border-lime-400"
          }`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          {...register("password")}
          className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ring-lime-400/20 focus:ring-2 ${
            errors.password ? "border-rose-500 focus:border-rose-500" : "border-gray-200 focus:border-lime-400"
          }`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="solid"
        className="w-full rounded-full bg-lime-400 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-lime-300"
      >
        Sign in
      </Button>
    </form>
  );
}