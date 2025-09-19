import React, { useEffect, useState } from "react";
import ProdukCard from "../components/ProdukCard";
import axios from "axios";

function Katalog() {
  const [produk, setProduk] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/api/produk`)
      .then(res => setProduk(res.data))
      .catch(err => console.log(err));
  }, [API_URL]);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Katalog OKIMI Parfum</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {produk.map(p => <ProdukCard key={p._id} produk={p} />)}
      </div>
      <footer style={{ textAlign: "center", marginTop: "30px" }}>© ETRIXTECH</footer>
    </div>
  );
}

export default Katalog;