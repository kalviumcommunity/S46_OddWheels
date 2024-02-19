import React, { useState } from "react";
import backgroundImage from "../../src/Public/loginBackGround.svg";
import axios from "axios";

export const Signin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
    // Clear error message when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    // Validate form fields
    if (!credentials.email) {
      newErrors.email = "Email address, please";
    }
    if (!credentials.password) {
      newErrors.password = "Password, please";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't submit if there are validation errors
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email: credentials.email, password: credentials.password },
        { withCredentials: true }, // Enable sending cookies
      );
      console.log(response.data);
      if (!response.data.validate) {
        setErrors({ ...errors, heading: response.data.message });
        return;
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center p-24"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-3/10 mx-auto mt-8 rounded-xl bg-white p-12">
        <h2 className="mb-4 text-center text-2xl font-bold text-violet-700">
          Sign In
        </h2>
        {errors.heading && (
          <p className="pb-2 text-sm text-red-500">{errors.heading}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="bg-gray-50ring-0 relative block w-full rounded-lg border-2 border-neutral-300 p-2.5 text-sm text-neutral-900  placeholder-violet-700 outline-none placeholder:opacity-60 checked:bg-emerald-500 hover:border-violet-500 focus:border-violet-500 focus:ring-violet-500"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="bg-gray-50ring-0 relative block w-full rounded-lg border-2 border-neutral-300 p-2.5 text-sm text-neutral-900  placeholder-violet-700 outline-none placeholder:opacity-60 checked:bg-emerald-500 hover:border-violet-500 focus:border-violet-500 focus:ring-violet-500"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="pt-2 text-center">
            <button
              type="submit"
              className=" rounded border-2 border-neutral-300 px-4 py-2 text-violet-700 hover:bg-black hover:bg-violet-700 hover:text-white"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
