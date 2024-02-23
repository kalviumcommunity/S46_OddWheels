import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import axios from "axios";
import backgroundImage from "../Public/HomeBG.svg";
import { Profile } from "./cards/Profile";
import { NewPost } from "./cards/NewPost";
import { Post } from "./cards/Post";

export const Home = () => {
  const [postPop, setPostPop] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]); // Add token to useCookies argument
  const [posts, setPosts] = useState([]); // Initialize posts state with empty array

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("fetching post data");
        const { data } = await axios.get(
          "http://localhost:3000/api/fetch/post",
          {
            withCredentials: true,
          },
        );
        console.log(data);
        if (Array.isArray(data)) {
          setPosts(data); // Update posts state with fetched data
        } else {
          console.error("Data received is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        if (!cookies.token || cookies.token === "undefined") {
          navigate("/login");
          return;
        }
        await axios.post(
          "http://localhost:3000/api/auth/home",
          {},
          { withCredentials: true },
        );
      } catch (error) {
        console.error("Error verifying cookie:", error);
        Cookies.remove("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies.token, navigate]); // Add cookies.token and navigate to the dependency array

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const handleAddPostClick = () => {
    setPostPop(true);
  };

  const handleAddPostCloseClick = () => {
    console.log("close clicked");
    setPostPop(false);
  };
  console.log(posts);
  return (
    <>
      <div className="flex justify-center">
        <div
          className="h-screen w-full max-w-screen-2xl bg-cover bg-center p-4"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {postPop && <NewPost close={handleAddPostCloseClick} />}
          <div className="flex h-7/100 w-full items-center justify-between rounded-lg bg-white bg-opacity-60 p-4">
            <div>OddWheels</div>
            <div>
              <div
                className="cursor-pointer rounded-lg border-b-[4px] border-violet-700 bg-violet-500 px-5 py-1 text-white hover:border-violet-500 hover:bg-violet-700"
                onClick={logout}
              >
                Log Out
              </div>
            </div>
          </div>
          <div className="flex h-91/100">
            <div className="my-4 mr-4 flex h-full w-1/5 flex-col justify-between rounded-lg bg-white bg-opacity-60">
              <div>
                <Profile />
              </div>
              <div
                className="m-4 rounded-full bg-violet-500 px-4 py-2 text-center text-white hover:bg-violet-700 focus:outline-none active:bg-purple-900"
                onClick={handleAddPostClick}
              >
                Add Post
              </div>
            </div>
            <div className="my-4 flex h-full w-4/5 flex-wrap overflow-scroll rounded-lg bg-white bg-opacity-60">
              {posts.map((item) => (
                <Post key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
