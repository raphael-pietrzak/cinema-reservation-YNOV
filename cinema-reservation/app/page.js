"use client";
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "@/components/Navbar";


const App = () => {
  return (
      <div>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Autres routes ici */}
            </Routes>
          </Router>
        </div>
  );
};

export default App;
