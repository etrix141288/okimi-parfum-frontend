import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Katalog from "./pages/Katalog";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Katalog />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;