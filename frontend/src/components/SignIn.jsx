import React from "react";

export const SignIn = () => {
  return (
    <div className="bg-slate-300  flex justify-center py-10">
      <div className="flex flex-col rounded shadow-md h-max bg-white p-8 w-96">
        <div className="text-4xl font-bold text-center">Sign In</div>
        <div className="text-slate-500 text-center mt-2 mb-6">
          Enter your credentials to access your account
        </div>

        <div className="w-full mt-4">
          <label className="block text-left font-semibold mb-2">Email</label>
          <input
            placeholder="xyz@penguin.com"
            className="w-full h-10 px-3 border rounded border-slate-200"
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-left font-semibold mb-2">Password</label>
          <input
            type="password"
            className="w-full h-10 px-3 border rounded border-slate-200"
          />
        </div>
        <div className="w-full mt-6">
          <button
            type="button"
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            Sign In
          </button>
        </div>
        <div className="w-full mt-4 text-center text-sm font-semibold ">
          Don't have an account?{" "}
          <span className="underline cursor-pointer">Sign Up</span>
        </div>
      </div>
    </div>
  );
};
