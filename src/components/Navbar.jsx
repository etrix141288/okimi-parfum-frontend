import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "20px" }}>OKIMI Parfum</Link>
      <Link to="/admin" style={{ color: "#fff" }}>Admin</Link>
    </nav>
  );
}

export default Navbar;