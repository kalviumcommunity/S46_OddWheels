import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

export const Profile = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/fetch/profile",
          { withCredentials: true },
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-50">
      {data && Object.keys(data).length > 0 && (
        <>
          <div className=" flex flex-col items-center p-4 text-center">
            <div className="pb-4">
              <img
                className="h-40 w-40 rounded-full "
                src={`data:${data.profileImage.contentType};base64,${Buffer.from(
                  data.profileImage.data,
                ).toString("base64")}`}
                alt="Profile"
              />
            </div>
            <div className="pb-2 text-lg font-bold">
              <p>
                {data.firstName} {data.lastName}
              </p>
            </div>
            {/* <div className="pb-2 text-lg">{data.username}</div>
            <div className="pb-2 text-lg">{data.email}</div> */}
            <div className="pb-2 text-sm">{data.bio}</div>
            {/* <div className="pb-2 text-lg ">{data.location}</div> */}
          </div>
        </>
      )}
    </div>
  );
};
