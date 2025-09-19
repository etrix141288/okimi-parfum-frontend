import React, { useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [token, setToken] = useState("");
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [produk, setProduk] = useState([]);
  const [form, setForm] = useState({ nama: "", deskripsi: "", harga: "", kategori: "", gambar: null });

  const API_URL = process.env.REACT_APP_API_URL;

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, loginData);
      setToken(res.data.token);
      fetchProduk(res.data.token);
    } catch(err) {
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  const fetchProduk = async (t) => {
    const res = await axios.get(`${API_URL}/api/produk`, { headers: { Authorization: `Bearer ${t}` } });
    setProduk(res.data);
  };

  const handleAdd = async () => {
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    await axios.post(`${API_URL}/api/produk`, data, { headers: { Authorization: `Bearer ${token}` } });
    fetchProduk(token);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/produk/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchProduk(token);
  };

  if(!token) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Login Admin</h2>
        <input placeholder="Username" onChange={e => setLoginData({...loginData, username:e.target.value})} /><br/>
        <input placeholder="Password" type="password" onChange={e => setLoginData({...loginData, password:e.target.value})} /><br/>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      <h3>Tambah Produk</h3>
      <input placeholder="Nama" onChange={e=>setForm({...form,nama:e.target.value})} /><br/>
      <input placeholder="Deskripsi" onChange={e=>setForm({...form,deskripsi:e.target.value})} /><br/>
      <input placeholder="Harga" type="number" onChange={e=>setForm({...form,harga:e.target.value})} /><br/>
      <input placeholder="Kategori" onChange={e=>setForm({...form,kategori:e.target.value})} /><br/>
      <input type="file" onChange={e=>setForm({...form,gambar:e.target.files[0]})} /><br/>
      <button onClick={handleAdd}>Tambah Produk</button>

      <h3>Daftar Produk</h3>
      {produk.map(p => (
        <div key={p._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <img src={`${API_URL}${p.gambar}`} alt={p.nama} style={{ width: "100px", height: "100px" }} />
          <p>{p.nama}</p>
          <p>{p.deskripsi}</p>
          <p>Rp {p.harga.toLocaleString()}</p>
          <p>Kategori: {p.kategori}</p>
          <button onClick={()=>handleDelete(p._id)}>Hapus</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;