import React, { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage from "../Public/HomeBG.svg";
import { Buffer } from "buffer";
import { Post } from "./cards/Post";
export const Profilepage = () => {
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]); // Initialize posts state with empty array
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/fetch/profile",
          { withCredentials: true },
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
      try {
        const post = await axios.get(
          "http://localhost:3000/api/fetch/userpost",
          { withCredentials: true },
        );
        setPosts(post.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(posts);

  // console.log(data);
  return (
    <div className="flex justify-center">
      <div
        className="h-screen w-full max-w-screen-2xl overflow-scroll bg-cover bg-center p-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="h-40/100 w-full bg-white bg-opacity-60 p-4">
          {data && Object.keys(data).length > 0 && (
            <>
              <div className=" h-full;  flex w-full items-center p-4 text-center">
                <div className="flex w-1/3 justify-center pb-4">
                  <img
                    className="w-atuo h-60 rounded-full "
                    src={`data:${data.profileImage.contentType};base64,${Buffer.from(
                      data.profileImage.data,
                    ).toString("base64")}`}
                    alt="Profile"
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div className="pb-2 text-lg font-bold">
                    <p>
                      {data.firstName} {data.lastName}
                    </p>
                  </div>
                  <div className="pb-2 text-lg">{data.username}</div>
                  <div className="pb-2 text-lg">{data.email}</div>
                  <div className="pb-2 text-lg ">{data.location}</div>
                  <div className="pb-2 text-sm">{data.bio}</div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-4  w-full  bg-white bg-opacity-60 p-2">
          <div className="text-center text-xl font-bold">Your Post</div>
          <div className="my-4 flex w-full flex-wrap rounded-lg bg-white bg-opacity-0">
            {posts.map((item) => (
              <Post key={item.id} data={item} edit={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
