import React, { useState } from "react";
import "./Sale.css";
import { FaEdit, FaSearch } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";

function Sale({ token }) {
  const [sales, setSales] = useState([]);

  return (
    <div className="saleSection">
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

          <Link to={"/sale/all"}>
            <div className="sales box_link">Chegirmalar</div>
          </Link>

          <Link to={"/"}>
            <div className="users box_link">Foydalanuvchilar</div>
          </Link>
        </div>
        <div className="main_right">
          <div className="main_right-head">
            <h3>O'zgartirish uchun qalamchani tanlang</h3>
            <button className="client_add">
              CHEGIRMA QO'SHISH
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="editClient_btn">
                  <FaEdit />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="client_count"> ta mijoz</div>

          <div className="paginations">
            <div className="prev">
              {sales.previous ? (
                <button
                  onClick={() => {
                    prevData();
                  }}
                >
                  Ortga
                </button>
              ) : (
                <button className="disabled_btn" disabled>
                  Ortga
                </button>
              )}
            </div>
            <div className="next">
              {sales.next ? (
                <button
                  onClick={() => {
                    nextData();
                  }}
                >
                  Keyingi
                </button>
              ) : (
                <button className="disabled_btn" disabled>
                  Keyingi
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sale;
