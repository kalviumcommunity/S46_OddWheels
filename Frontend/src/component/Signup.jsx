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

  // State to manage field validation
  const [errors, setErrors] = useState({});

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error message when user starts typing
    setErrors({
      ...errors,
      [name]: "",
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
    const newErrors = {};

    // Validate form fields
    if (!formData.firstName) {
      newErrors.firstName = "First name, please.";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name, please";
    }
    if (!formData.username) {
      newErrors.username = "Username, please";
    }
    if (!formData.email) {
      newErrors.email = "Email address, please";
    }
    if (!formData.password) {
      newErrors.password = "Password, please";
    } else if (formData.password.length < 8 || formData.password.length > 13) {
      newErrors.password = "Password, should be between 8 and 13 characters";
    }
    if (!formData.location) {
      newErrors.location = "Location, please";
    }
    if (!formData.profileImage) {
      newErrors.profileImage = "Profile picture, please";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't submit if there are validation errors
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
    console.log(data.email);
    try {
      // Check if email already exists
      const emailExists = await axios.post(
        "http://localhost:3000/api/auth/checkemail",
        { email: formData.email },
      );
      console.log(emailExists);
      if (emailExists.data.emailExists) {
        setErrors({ ...errors, email: "Email already exists" });
        return;
      }

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
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
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
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
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
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
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
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
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
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location}</p>
            )}
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
            {errors.profileImage && (
              <p className="text-sm text-red-500">{errors.profileImage}</p>
            )}
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
