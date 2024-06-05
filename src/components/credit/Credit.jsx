import React from "react";
import "./Credit.css";
import { TiPlus } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Credit() {
  return (
    <div className="creditSection">
      <div className="container">
        <div className="main_left">
          <Link to={"/client/all"}>
            <div className="clients box_link">Mijozlar</div>
          </Link>

          <Link to={"/credit/all"}>
            <div className="credit box_link">Credit baza</div>
          </Link>

          <Link to={"/product/all"}>
            <div className="products box_link">Mahsulotlar</div>
          </Link>

          <Link to={"/"}>
            <div className="sales box_link">Chegirmalar</div>
          </Link>

          <Link to={"/"}>
            <div className="users box_link">Foydalanuvchilar</div>
          </Link>
        </div>
        <div className="main_right">
          <div className="main_right-head">
            <h3>O'zgartirish uchun mahsulot tanlang</h3>
            <button className="client_add">
              MAHSULOT QO'SHISH
              <TiPlus />
            </button>
          </div>
          <div className="client_search">
            <form action="">
              <FaSearch />
              <input type="text" placeholder="Qidiruv..." />
            </form>
          </div>
          <table className="client_table">
            <thead>
              <tr>
                <th>№</th>
                <th>Nomi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Alibaba</td>
              </tr>
            </tbody>
          </table>
          <div className="client_count">1 ta mijoz</div>

          <div className="paginations">
            <div className="prev">
              <button className="disabled_btn" disabled>
                Ortga
              </button>
            </div>
            <div className="next">
              <button className="disabled_btn" disabled>
                Keyingi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credit;
