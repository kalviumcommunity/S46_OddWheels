import React, { useState } from "react";
import axios from "axios";

export const Edit = ({ close, data, edit }) => {
  const [formData, setFormData] = useState({
    captions: data.captions || "",
    hashTag: data.hashTag || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate form fields
    if (!formData.captions.trim()) {
      newErrors.captions = "Captions, please";
    }
    if (!formData.hashTag.trim()) {
      newErrors.hashTag = "Hash Tag, please";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const postData = {
      id: data._id,
      captions: formData.captions,
      hashTag: formData.hashTag,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/post/update",
        postData,
        {
          withCredentials: true,
        },
      );

      console.log(response);
      if (response.data.success) {
        window.location.reload();
        close();
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const inputClass =
    "bg-gray-50 ring-0 relative block w-full rounded-lg border-2 border-neutral-300 p-2.5 text-sm text-neutral-900 placeholder-violet-700 outline-none placeholder-opacity-60 checked:bg-emerald-500 hover:border-violet-500 focus:border-violet-500 focus:ring-violet-500";

  const buttonClass =
    "mx-5 w-24 rounded border-2 border-neutral-300 px-4 py-2 text-violet-700 hover:bg-black hover:bg-violet-700 hover:text-white";

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-violet-700 bg-opacity-50 p-4 text-center">
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

        <div className="flex justify-center pt-8 text-center">
          <div onClick={close} className={buttonClass}>
            Close
          </div>
          {!edit && (
            <div>
              <button type="submit" className={buttonClass}>
                Post
              </button>
            </div>
          )}
          {edit && (
            <div>
              <button type="submit" className={buttonClass}>
                Update
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
