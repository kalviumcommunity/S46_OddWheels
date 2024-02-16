import React, { useState } from "react";
import backgroundImage from "../../src/Public/loginBackGround.svg";
import axios from "axios";

export const Signup = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    location: "",
    profileImage: null,
  });

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle change in profile image input
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if profile image is provided
    if (!formData.profileImage) {
      return console.log("You must provide at least 1 file");
    }

    // Create FormData object to send to the server
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("location", formData.location);
    data.append("profileImage", formData.profileImage); // Ensure consistency with Multer configuration

    try {
      // Make API call to server for signup
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  // Render the Signup component
  return (
    <div
      className="flex h-screen items-center justify-end bg-cover bg-center p-24"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="mx-auto mt-8 max-w-md rounded-xl bg-white p-12">
        <h2 className="mb-4 text-center text-2xl font-bold text-violet-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full justify-between">
            <div className="mb-4 w-full">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-gray-50ring-0 relative block w-11/12 rounded-lg border-2 border-neutral-300 p-2.5  text-sm text-neutral-900 placeholder-violet-700 outline-none placeholder:opacity-60 checked:bg-emerald-500 hover:border-violet-500 focus:border-violet-500 focus:ring-violet-500"
                placeholder="First Name"
              />
            </div>
            <div className="mb-4 w-11/12">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-gray-50ring-0 relative block w-full rounded-lg border-2 border-neutral-300 p-2.5 text-sm text-neutral-900  placeholder-violet-700 outline-none placeholder:opacity-60 checked:bg-emerald-500 hover:border-violet-500 focus:border-violet-500 focus:ring-violet-500 "
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-50ring-0 relative block w-full rounded-lg border-2 border-neutral-300 p-2.5 text-sm text-neutral-900  placeholder-violet-700 outline-none placeholder:opacity-60 checked:bg-emerald-500 hover:border-violet-500 focus:border-violet-500 focus:ring-violet-500"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50ring-0 relative block w-full rounded-lg border-2 border-neutral-300 p-2.5 text-sm text-neutral-900  placeholder-violet-700 outline-none placeholder:opacity-60 checked:bg-emerald-500 hover:border-violet-500 focus:border-violet-500 focus:ring-violet-500"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50ring-0 relative block w-full rounded-lg border-2 border-neutral-300 p-2.5 text-sm text-neutral-900  placeholder-violet-700 outline-none placeholder:opacity-60 checked:bg-emerald-500 hover:border-violet-500 focus:border-violet-500 focus:ring-violet-500"
              placeholder="Password"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="bg-gray-50ring-0 relative block w-full rounded-lg border-2 border-neutral-300 p-2.5 text-sm text-neutral-900  placeholder-violet-700 outline-none placeholder:opacity-60 checked:bg-emerald-500 hover:border-violet-500 focus:border-violet-500 focus:ring-violet-500"
              placeholder="Location"
            />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-violet-700 opacity-60 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Profile Picture
            </label>
            <input
              id="profileImage"
              name="profileImage"
              onChange={handleImageChange}
              type="file"
              className="border-input flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-600 hover:border-violet-500 hover:bg-pallet1"
            />
          </div>
          <div className="pt-8 text-center">
            <button
              type="submit"
              className=" rounded border-2 border-neutral-300 px-4 py-2 text-violet-700 hover:bg-black hover:bg-violet-700 hover:text-white"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
