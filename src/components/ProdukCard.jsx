import React from "react";

function ProdukCard({ produk }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "200px", margin: "10px" }}>
      <img src={`${process.env.REACT_APP_API_URL}${produk.gambar}`} alt={produk.nama} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
      <h3>{produk.nama}</h3>
      <p>{produk.deskripsi}</p>
      <p>Rp {produk.harga.toLocaleString()}</p>
      <p>Kategori: {produk.kategori}</p>
    </div>
  );
}

export default ProdukCard;