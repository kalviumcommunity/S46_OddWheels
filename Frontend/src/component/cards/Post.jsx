import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

export const Post = ({ data }) => {
  console.log(data);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("fetching post user data");
        const response = await axios.post(
          "http://localhost:3000/api/fetch/post/user",
          { userId: data.userID },
          { withCredentials: true },
        );
        const userData = response.data;
        setUser(userData.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [data.userID]);

  return (
    <div className="h-1/2 w-1/2 p-3">
      <div className="flex h-full flex-col rounded-xl bg-white bg-opacity-50 p-2">
        <div className="flex h-2/3 justify-center">
          <img
            className="h-full w-auto"
            src={`data:${data.postImage.contentType};base64,${Buffer.from(
              data.postImage.data,
            ).toString("base64")}`}
            alt="Post"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <img
              className="h-16 w-16 rounded-full"
              src={`data:${user.profileImage?.contentType};base64,${Buffer.from(
                user.profileImage?.data ?? "",
              ).toString("base64")}`}
              alt="Profile"
            />
            <div className="pl-2">{user.username}</div>
          </div>
          <div>{data.captions}</div>
          <div>{data.hashTag}</div>
          {/* Add more user data fields as needed */}
        </div>
      </div>
    </div>
  );
};
