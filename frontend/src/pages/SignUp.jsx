import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const navigateToSignIn = () => {
    navigate("/signin");
  };
  return (
    <div className="bg-slate-300  flex justify-center py-10">
      <div className="flex flex-col rounded shadow-md h-max bg-white p-8 w-96">
        <div className="text-4xl font-bold text-center">Sign Up</div>
        <div className="text-slate-500 text-center mt-2 mb-6">
          Enter your information to create an account
        </div>
        <div className="w-full">
          <label className="block text-left font-semibold mb-2">
            First Name
          </label>
          <input
            placeholder="John"
            className="w-full h-10 px-3 border rounded border-slate-200"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-left font-semibold mb-2">
            Last Name
          </label>
          <input
            placeholder="Doe"
            className="w-full h-10 px-3 border rounded border-slate-200"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-left font-semibold mb-2">Email</label>
          <input
            placeholder="xyz@penguin.com"
            className="w-full h-10 px-3 border rounded border-slate-200"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-left font-semibold mb-2">Password</label>
          <input
            type="password"
            className="w-full h-10 px-3 border rounded border-slate-200"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="w-full mt-6">
          <button
            type="button"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  firstName,
                  lastName,
                  password,
                  username,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigateToSignIn();
            }}
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            Sign Up
          </button>
        </div>
        <div className="w-full mt-4 text-center text-sm font-semibold ">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigateToSignIn()}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};
