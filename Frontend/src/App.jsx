import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Login } from "./component/Login";
import { Signin } from "./component/Signin";
import { Signup } from "./component/Signup";
import { Home } from "./component/Home";
import { Profilepage } from "./component/Profilepage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Signin />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profilepage />} />
    </Routes>
  );
}

export default App;
