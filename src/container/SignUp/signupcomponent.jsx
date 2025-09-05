'use client';

export default function SignUpContainer() {
  return (
    <div className="flex flex-row text-gray-600 h-[calc(100vh-60px)]">
      {/* Left Image */}
      <div className="w-1/2 h-full">
        <img
          src="/banner7.jpg"
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="w-1/2 h-full flex flex-col justify-center px-10 py-20">
        <h2 className="text-2xl font-semibold mb-1">Sign Up</h2>
        <p className="text-sm text-gray-600 mb-10">
          Sign up for free to access to in any of our products
        </p>


        {/* <button className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-600 py-2 mb-2 hover:bg-gray-100">
          <img
            src="/globe.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue With Google
        </button>

        <button className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-600 py-2 mb-5 hover:bg-gray-100">
          <img
            src="/twitter.png" 
            alt="Twitter"
            className="w-5 h-5"
          />
          Continue With Twitter
        </button> */}

        {/* Divider */}
        {/* <div className="flex items-center my-5 text-gray-400 text-center">
          <span className="flex-grow h-px bg-gray-300"></span>
          <span className="px-2">OR</span>
          <span className="flex-grow h-px bg-gray-300"></span>
        </div> */}
        {/* Name */}
        <p className="text-sm text-gray-600 mb-2">Name</p>
        <input
          type="text"
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Email */}
        <p className="text-sm text-gray-600 mb-2">Email address</p>
        <input
          type="email"
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Password */}
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-600">Password</p>
          <p className="text-sm text-gray-600 cursor-pointer">Hide</p>
        </div>
        <input
          type="password"
          className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <p className="text-sm text-gray-600 mb-5">
          Use 8 or more characters with a mix of letters, numbers & symbols
        </p>

        {/* Checkboxes */}
        <div className="flex items-start gap-2 mt-5">
          <input type="checkbox" className="mt-1" />
          <p className="text-sm text-gray-600">
            Agree to our <a href="#" className="underline">Terms of use</a> and <a href="#" className="underline">Privacy Policies</a>
          </p>
        </div>

        <div className="flex items-start gap-2 mt-2 mb-4">
          <input type="checkbox" className="mt-1" />
          <p className="text-sm text-gray-600">
            Subscribe to our monthly newsletter
          </p>
        </div>

        {/* Sign Up Button */}
        <button className="bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 self-start">
          Sign Up
        </button>

        {/* Footer Link */}
        <div className="mt-4 text-sm text-gray-700">
          Already have an account?
          <a href="/login" className="ml-1 font-bold text-purple-600 hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
