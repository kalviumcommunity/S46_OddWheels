import "./App.css";
import { DisplayList } from "./component/DisplayList";
import { DisplayUpload } from "./component/DisplayUpload";
import Upload from "./component/Upload";

function App() {
  return (
    <>
      {/* <DisplayList /> */}
      <Upload />
      <DisplayUpload />
    </>
  );
}

export default App;
