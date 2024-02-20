import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import axios from "axios";
import backgroundImage from "../../src/Public/HomeBG.svg";
import { Profile } from "./cards/Profile";
import { NewPost } from "./cards/NewPost";

export const Home = () => {
  const [postPop, setPostPop] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies();
  // const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        if (!cookies.token || cookies.token === "undefined") {
          navigate("/login");
          return;
        }
        const { data } = await axios.post(
          "http://localhost:3000/api/auth/home",
          {},
          { withCredentials: true },
        );
        // console.log(data);
        if (!data) {
          Cookies.remove("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying cookie:", error);
        // Handle error here, such as showing an error message to the user
        // For example, you can navigate the user to an error page
        navigate("/error");
      }
    };
    verifyCookie();
  }, [cookies.token, navigate, cookies]);

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  const handleAddPostClick = () => {
    setPostPop(true);
  };
  const handleAddPostCloseClick = () => {
    console.log("close clied");
    setPostPop(false);
  };

  return (
    <>
      <div
        className=" h-screen w-screen bg-cover bg-center p-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {postPop && <NewPost close={handleAddPostCloseClick} />}
        <div className="h-7/100 flex w-full items-center justify-between rounded-lg bg-white bg-opacity-60 p-4">
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
        <div className="h-91/100 flex">
          <div className="my-4 mr-4 flex h-full w-1/5 flex-col justify-between rounded-lg bg-white bg-opacity-60">
            <div className="">
              <Profile />
            </div>
            <div
              className="m-4 rounded-full bg-violet-500 px-4 py-2 text-center text-white hover:bg-violet-700 focus:outline-none active:bg-purple-900"
              onClick={handleAddPostClick}
            >
              Add Post
            </div>
          </div>
          <div className="my-4  h-full w-4/5 rounded-lg bg-white bg-opacity-60">
            sad
          </div>
        </div>
      </div>
    </>
  );
};
