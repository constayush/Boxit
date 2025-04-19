import { BrowserRouter as Router, Routes, Route } from "react-router";
import Select from "./components/pages/Select";
import Train from "./components/pages/Train";
import Home from "./components/pages/Home";
import Learn from "./components/pages/Learn";

function App() {


  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/select" element={<Select />} />
        <Route path="/train" element={<Train />} />
      </Routes>
    </Router>
  );
}

export default App;
