import React, { useState } from "react";
import axios from "axios";

function Upload() {
  // State variables for file and message
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Function to handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    try {
      // Check if a file is selected
      if (!file) {
        setMessage("You must provide at least 1 file");
        return;
      }

      // Send POST request to upload endpoint
      const response = await axios.post(
        "http://localhost:3000/api/DB/upload",
        { file: file }, // Pass file in the request body
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Handle response
      if (response.data.success) {
        setMessage(response.data.message); // Show success message
      } else {
        setMessage("File upload failed"); // Show failure message
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setMessage("Server Error"); // Show server error message
    }
  };

  // Render file input, upload button, and message
  return (
    <div>
      <input type="file" name="avatar" onChange={handleFileChange} />
      <button type="button" onClick={handleFileUpload}>
        Upload
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Upload;
