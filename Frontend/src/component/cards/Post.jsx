import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { Edit } from "./Edit";

export const Post = ({ data, edit }) => {
  const [user, setUser] = useState({});
  const [editState, setEditState] = useState(false);

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
        // console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [data.userID]);

  const editPost = (data) => {
    console.log("Edit post clicked");
    setEditState(true);
    // Implement edit functionality here
  };

  const deletePost = async (postId) => {
    console.log("Delete post clicked", postId);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/post/delete",
        { postId: postId },
        { withCredentials: true },
      );
      console.log(response);
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error
    }
    // Implement delete functionality here
  };
  const handleAddPostCloseClick = () => {
    console.log("close clicked");
    setEditState(false);
  };
  return (
    <div className="h-96 w-1/2 p-3">
      {editState && (
        <Edit close={handleAddPostCloseClick} data={data} edit={true} />
      )}
      <div className="flex h-full flex-col rounded-xl bg-white bg-opacity-50 p-2">
        <div className="flex items-center justify-between pl-4">
          <div className="flex w-full items-center  pl-4">
            <img
              className="h-16 w-16 rounded-full"
              src={`data:${user.profileImage?.contentType};base64,${Buffer.from(
                user.profileImage?.data ?? "",
              ).toString("base64")}`}
              alt="Profile"
            />
            <div className="pl-2">{user.username}</div>
          </div>

          <div>
            {edit && (
              <div className="flex p-2">
                <div
                  className=" m-2 cursor-pointer rounded-lg border-b-[4px] border-green-700 bg-green-500 px-2 py-1 text-white hover:border-green-500 hover:bg-green-700"
                  onClick={() => editPost(data)}
                >
                  edit
                </div>
                <div
                  className=" m-2 cursor-pointer rounded-lg border-b-[4px] border-red-700 bg-red-500 px-2 py-1 text-white hover:border-red-500 hover:bg-red-700"
                  onClick={() => deletePost(data._id)}
                >
                  delete
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex h-2/3 justify-center">
          <img
            className="h-full w-auto"
            src={`data:${data.postImage.contentType};base64,${Buffer.from(
              data.postImage.data,
            ).toString("base64")}`}
            alt="Post"
          />
        </div>
        <div className="flex flex-col pl-4">
          <div>{data.captions}</div>
          <div>{data.hashTag}</div>
          {/* Add more user data fields as needed */}
        </div>
      </div>
    </div>
  );
};
