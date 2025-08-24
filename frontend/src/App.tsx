import { BrowserRouter as Router, Routes, Route } from "react-router";
import Select from "./components/pages/Select";
import Train from "./components/pages/Train";
import Home from "./components/pages/Home";
import Learn from "./components/pages/Learn";
import Navbar from "./components/ui/Navbar";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { ReactLenis } from 'lenis/react'

function App() {

  return (
    <> 
    <ReactLenis root />
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/select" element={<Select />} />
        <Route path="/train" element={<Train />} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/signup" element={<><Navbar /><Signup /></>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
