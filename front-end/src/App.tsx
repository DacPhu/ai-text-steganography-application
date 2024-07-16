import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import EncryptPage from "./pages/EncryptPage";
import DecryptPage from "./pages/DecryptPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/encrypt" element={<EncryptPage />} />
        <Route path="/decrypt" element={<DecryptPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
