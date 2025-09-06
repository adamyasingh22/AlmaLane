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

  const handleSignUp = async () => {
    if (!agreeTerms) {
      alert("You must agree to the terms and privacy policies.");
      return;
    }

    const result = await dispatch(signupUser({ email, password, name }));

    if (signupUser.fulfilled.match(result)) {
    console.log("Signup successful:", result.payload);
    window.location.href = "/";
    } else {
    console.error("Signup failed:", result.payload);
    }

  };

  return (
    <div className="flex flex-row text-gray-600 h-[calc(100vh-60px)]">
      {/* Left Image */}
      <div className="w-1/2 h-full">
        <Image
          src="/banner7.jpg"
          alt="Login Visual"
          className="w-full h-full object-cover"
          width={800}
          height={600}
        />
      </div>

      {/* Right Content */}
      <div className="w-1/2 h-full flex flex-col justify-center px-10 py-20">
        <h2 className="text-2xl font-semibold mb-1">Sign Up</h2>
        <p className="text-sm text-gray-600 mb-10">
          Sign up for free to access any of our products
        </p>

        {/* Name */}
        <p className="text-sm text-gray-600 mb-2">Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Email */}
        <p className="text-sm text-gray-600 mb-2">Email address</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Password */}
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-600">Password</p>
          <p className="text-sm text-gray-600 cursor-pointer">Hide</p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <p className="text-sm text-gray-600 mb-5">
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
          <p className="text-sm text-gray-600">
            Subscribe to our monthly newsletter
          </p>
        </div>

        {/* Error Message */}
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
