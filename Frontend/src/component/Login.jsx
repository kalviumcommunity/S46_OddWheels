import React, { useState } from "react";
import backgroundImage from "../../src/Public/loginBackGround.svg";

export const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can process or store the input value as per your requirement here
    console.log("Input value:", email);
    // Reset email after submission
    setEmail("");
  };

  return (
    // Container with background image and centered content
    <div
      className="flex h-screen items-center justify-end bg-cover bg-center p-24"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Form container */}
      <div className="flex flex-col items-center">
        {/* Title */}
        <div className="m-5 text-white">
          <h1 className="text-4xl font-bold">Login to OddWheels</h1>
        </div>

        {/* Form */}
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            {/* Email input */}
            <input
              className="m-2 block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {/* Password input */}
            <input
              className="m-2 block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {/* Submit button */}
            <button
              type="submit"
              className="m-2 block w-1/2 rounded-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>

          {/* Divider */}
          <div className="m-5 h-1 w-full bg-white"></div>

          {/* Sign up link */}
          <div className="m-2 block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};
