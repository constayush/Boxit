import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Select from "./components/pages/Select";
import Train from "./components/pages/Train";
import Home from "./components/pages/Home";
import Learn from "./components/pages/Learn";
import Navbar from "./components/ui/Navbar";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { ReactLenis } from 'lenis/react';
import { useAuthStore } from "./stores/authStore";
import { fetchMe } from "./services/auth";
import ProfilePage from "./components/pages/Profile";

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchMe();
        setUser(userData);
      } catch (err) {
        setUser(null); 
      }
    };

    getUser();
  }, [setUser]);

  return (
    <>
      <ReactLenis root />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/select" element={<Select />} />
          <Route path="/train" element={<Train />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
