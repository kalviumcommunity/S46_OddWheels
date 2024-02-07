import React from "react";
import carData from "../carsData.json";

export const DisplayList = () => {
  return (
    <>
      {carData.map((data) => (
        <div
          key={data._id}
          className="flex flex-col justify-center items-center"
        >
          <p>{data._id}</p>
          <img
            src={data.images}
            alt={`Car ${data._id}`}
            className="h-auto w-10/12"
          />
        </div>
      ))}
    </>
  );
};
