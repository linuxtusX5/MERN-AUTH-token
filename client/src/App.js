import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Inside from "./Inside";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/" element={<Register />} />
          <Route exact path="/Inside" element={<Inside />} />
        </Routes>
      </Router>
    </div>
  );
}
