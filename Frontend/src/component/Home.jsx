import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        if (!cookies.token || cookies.token === "undefined") {
          navigate("/");
          return;
        }
        const { data } = await axios.post(
          "http://localhost:3000/api/auth/home",
          {},
          { withCredentials: true },
        );
        const { user } = data;
        // console.log(data);
        if (!data.verification) {
          Cookies.remove("token");
          navigate("/login");
        }
        setUsername(user);
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

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={logout}>LOGOUT</button>
      </div>
    </>
  );
};
