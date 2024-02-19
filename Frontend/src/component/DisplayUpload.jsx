import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

export const DisplayUpload = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/DB/uimages");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };

  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={`data:${image.file.contentType};base64,${Buffer.from(
              image.file.data,
            ).toString("base64")}`}
            alt="Uploaded"
          />
        </div>
      ))}
    </div>
  );
};
