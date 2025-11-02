import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import StartCoding from "./components/StartCoding";
import CollaborativeCodeEditor from "./components/CollaborativeCodeEditor";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/startcoding" element={<StartCoding />} />
        <Route path="/editor" element={<CollaborativeCodeEditor />} />
      </Routes>
    </div>
  );
}

export default App;
