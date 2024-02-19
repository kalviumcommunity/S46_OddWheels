import "./App.css";
import { Routes, Route } from "react-router-dom";
import { DisplayList } from "./component/DisplayList";
import { DisplayUpload } from "./component/DisplayUpload";
import { Login } from "./component/Login";
import { Signin } from "./component/Signin";
import { Signup } from "./component/Signup";
import Upload from "./component/Upload";
import { Home } from "./component/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/displaylist" element={<DisplayList />} />
      <Route path="/displayupload" element={<DisplayUpload />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
