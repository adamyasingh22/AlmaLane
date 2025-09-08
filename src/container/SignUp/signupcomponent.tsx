"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, selectIsLoading, selectAuth } from "@/store/authSlice";
import type { AppDispatch } from "@/store";
import Image from "next/image";

export default function SignUpContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const { error } = useSelector(selectAuth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const handleSignUp = async () => {
    const newErrors: typeof errors = {};

    if (!agreeTerms) {
      alert("You must agree to the terms and privacy policies.");
      return;
    }

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // Stop execution if there are validation errors
    if (Object.keys(newErrors).length > 0) return;

    const result = await dispatch(signupUser({ email, password, name }));

    if (signupUser.fulfilled.match(result)) {
      console.log("Signup successful:", result.payload);
      window.location.href = "/";
    } else {
      console.error("Signup failed:", result.payload);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-60px)] text-gray-600">
      {/* Left Image */}
      <div className="hidden md:block md:w-1/2 h-60 md:h-full">
        <Image
          src="/banner7.jpg"
          alt="Login Visual"
          className="w-full h-full object-cover"
          width={800}
          height={600}
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-5 md:px-10 py-10">
        <h2 className="text-2xl font-semibold mb-1">Sign Up</h2>
        <p className="text-sm text-gray-600 mb-10">
          Sign up for free to access any of our products
        </p>

        {/* Name */}
        <label className="text-sm text-gray-600 mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {errors.name && <p className="text-red-500 text-xs mb-3">{errors.name}</p>}

        {/* Email */}
        <label className="text-sm text-gray-600 mb-2">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {errors.email && <p className="text-red-500 text-xs mb-3">{errors.email}</p>}

        {/* Password */}
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-600">Password</label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-purple-600 hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {errors.password && <p className="text-red-500 text-xs mb-3">{errors.password}</p>}
        <p className="text-xs text-gray-500 mb-5">
          Use 8 or more characters with a mix of letters, numbers & symbols
        </p>

        {/* Checkboxes */}
        <div className="flex items-start gap-2 mt-5">
          <input
            type="checkbox"
            className="mt-1"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <p className="text-sm text-gray-600">
            Agree to our{" "}
            <a href="#" className="underline">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policies
            </a>
          </p>
        </div>

        <div className="flex items-start gap-2 mt-2 mb-4">
          <input type="checkbox" className="mt-1" />
          <p className="text-sm text-gray-600">Subscribe to our monthly newsletter</p>
        </div>

        {/* Global Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className={`bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 self-start ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Footer Link */}
        <div className="mt-4 text-sm text-gray-700">
          Already have an account?
          <a href="/auth/login" className="ml-1 font-bold text-purple-600 hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
