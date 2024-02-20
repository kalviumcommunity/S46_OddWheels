import axios from "axios";
import React, { useState } from "react";

export const NewPost = ({ close }) => {
  const [formData, setFormData] = useState({
    captions: "",
    hashTag: "",
    postImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      postImage: e.target.files[0],
    });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("submit clicked");
    e.preventDefault();
    const newErrors = {};
    setErrors(newErrors);

    // Validate form fields
    if (!formData.captions) {
      newErrors.captions = "Captions, please";
    }
    if (!formData.hashTag) {
      newErrors.hashTag = "Hash Tag, please";
    }
    if (!formData.postImage) {
      newErrors.postImage = "Post Image, please";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't submit if there are validation errors
    }

    const data = new FormData();
    data.append("captions", formData.captions);
    data.append("hashTag", formData.hashTag);
    data.append("postImage", formData.postImage);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/post/post",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        close();
      }

      // Handle response data accordingly
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const inputClass =
    "bg-gray-50 ring-0 relative block w-full rounded-lg border-2 border-neutral-300 p-2.5 text-sm text-neutral-900 placeholder-violet-700 outline-none placeholder-opacity-60 checked:bg-emerald-500 hover:border-violet-500 focus:border-violet-500 focus:ring-violet-500";

  const buttonClass =
    "mx-5 w-24 rounded border-2 border-neutral-300 px-4 py-2 text-violet-700 hover:bg-black hover:bg-violet-700 hover:text-white";

  return (
    <div className="absolute left-1/2 top-1/2 flex w-96 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-violet-700 bg-opacity-50 p-4 text-center">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            type="text"
            id="captions"
            name="captions"
            value={formData.captions}
            onChange={handleChange}
            className={inputClass}
            placeholder="Captions"
          />
          {errors.captions && (
            <p className="text-sm text-red-500">{errors.captions}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="hashTag"
            name="hashTag"
            value={formData.hashTag}
            onChange={handleChange}
            className={inputClass}
            placeholder="Hash Tag"
          />
          {errors.hashTag && (
            <p className="text-sm text-red-500">{errors.hashTag}</p>
          )}
        </div>

        <div className="grid items-center gap-1.5">
          <label className="text-sm font-medium leading-none text-white opacity-60 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Upload Image
          </label>
          <input
            id="postImage"
            name="postImage"
            onChange={handleImageChange}
            type="file"
            className="border-input flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-600 hover:border-violet-500 hover:bg-pallet1"
          />
          {errors.postImage && (
            <p className="text-sm text-red-500">{errors.postImage}</p>
          )}
        </div>
        <div className="flex justify-center pt-8 text-center">
          <div onClick={close} className={buttonClass}>
            Close
          </div>
          <div>
            <button type="submit" className={buttonClass}>
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
