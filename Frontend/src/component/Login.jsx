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
      className="h-screen bg-cover bg-center flex justify-end items-center p-24"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Form container */}
      <div className="flex flex-col items-center">
        {/* Title */}
        <div className="text-white m-5">
          <h1 className="text-4xl font-bold">Login to OddWheels</h1>
        </div>

        {/* Form */}
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            {/* Email input */}
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {/* Password input */}
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {/* Submit button */}
            <button
              type="submit"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-2"
            >
              Submit
            </button>
          </form>

          {/* Divider */}
          <div className="w-full bg-white h-1 m-5"></div>

          {/* Sign up link */}
          <div className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2">
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};
