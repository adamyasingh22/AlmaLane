'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function LoginContainer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Logging in with:', { email, password });
    // call your AuthContext login function here
  };

  return (
    <div className="flex flex-row h-[calc(100vh-60px)] text-gray-600">
      {/* Left Image */}
      <div className="w-1/2 h-full">
        <Image
          src="/banner11.jpg"
          alt="Login Visual"
          className="w-full h-full object-cover"
          width={800}
            height={600}
        />
      </div>

      {/* Right Content */}
      <div className="w-1/2 h-full flex flex-col justify-center px-10 py-16">
        <h2 className="text-2xl font-semibold mb-5">Sign In</h2>

        {/* Social Buttons */}
        <button className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-600 py-2 mb-3 hover:bg-gray-100">
          <Image src="/globe.svg" alt="Google" className="w-5 h-5" width={20} height={20}/>
          Continue With Google
        </button>

        <button className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-600 py-2 mb-3 hover:bg-gray-100">
          <Image src="/twitter.png" alt="Twitter" className="w-5 h-5" width={20} height={20}/>
          Continue With Twitter
        </button>

        {/* Divider */}
        <div className="flex items-center my-5 text-gray-400 text-center">
          <span className="flex-grow h-px bg-gray-300"></span>
          <span className="px-2">OR</span>
          <span className="flex-grow h-px bg-gray-300"></span>
        </div>

        {/* Email Input */}
        <p className="text-sm text-gray-600 mb-2">User name or email address</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Password Input */}
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-600">Password</p>
          <p className="text-sm text-gray-600 cursor-pointer">Hide</p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Forgot Password Link */}
        <div className="flex justify-end text-sm mb-2">
          <a href="#" className="text-gray-600 hover:underline">
            Forgot your password?
          </a>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700"
        >
          Sign In
        </button>

        {/* Footer */}
        <div className="mt-4 text-sm text-gray-700">
          Don’t have an account?
          <a href="/Signup" className="ml-1 font-bold text-purple-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
