"use client";

import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { register } from "@/app/service/service";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/context/ToastContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations";

export default function RegisterFormComponent() {
  const router = useRouter();
  const { addToast } = useToast();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthdate: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const [firstName, ...rest] = data.name.trim().split(" ");
      const lastName = rest.join(" ") || firstName; // fallback if only one word given

      const response = await register(
        firstName,
        lastName,
        data.email,
        data.password,
        data.birthdate
      );

      if (response.status >= 400) {
        const reason =
          response.status === 409
            ? "This email is already registered. Please log in instead."
            : response.detail || response.title || "Registration failed.";
        throw new Error(reason);
      }

      addToast({
        title: "Register Success",
        description: "Your account has been created successfully.",
        color: "success",
      });
      router.push("/login");
    } catch (error) {
      addToast({
        title: "Register Failed",
        description: error.message || "Failed to create account. Please try again.",
        color: "danger",
      });
    }
  };

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Full name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          type="text"
          {...registerField("name")}
          placeholder="Jane Doe"
          className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ring-lime-400/20 focus:ring-2 ${
            errors.name ? "border-rose-500 focus:border-rose-500" : "border-gray-200 focus:border-lime-400"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...registerField("email")}
          placeholder="you@example.com"
          className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ring-lime-400/20 focus:ring-2 ${
            errors.email ? "border-rose-500 focus:border-rose-500" : "border-gray-200 focus:border-lime-400"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...registerField("password")}
          placeholder="••••••••"
          className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ring-lime-400/20 focus:ring-2 ${
            errors.password ? "border-rose-500 focus:border-rose-500" : "border-gray-200 focus:border-lime-400"
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>
        )}
      </div>

      {/* Birthdate */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Birthdate
        </label>
        <input
          type="date"
          {...registerField("birthdate")}
          className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ring-lime-400/20 focus:ring-2 ${
            errors.birthdate ? "border-rose-500 focus:border-rose-500" : "border-gray-200 focus:border-lime-400"
          }`}
        />
        {errors.birthdate && (
          <p className="mt-1 text-xs text-rose-500">{errors.birthdate.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="solid"
        className="w-full rounded-full bg-lime-400 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-lime-300"
      >
        Create account
      </Button>
    </form>
  );
}
