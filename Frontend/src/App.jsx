import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Login } from "./component/Login";
import { Signin } from "./component/Signin";
import { Signup } from "./component/Signup";
import { Home } from "./component/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
