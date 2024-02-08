import React, { useEffect, useState } from "react";
import axios from "axios";

export const DisplayList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/image");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {data.map((dataset, index) => {
        return (
          <div key={index}>
            <div
              key={dataset._id}
              className="flex flex-col justify-center items-center"
            >
              <p>{dataset._id}</p>
              <img
                src={dataset.images}
                alt={`Car ${dataset._id}`}
                className="h-auto w-10/12"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
