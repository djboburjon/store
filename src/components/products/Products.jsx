import React, { useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { FaEdit, FaSearch } from "react-icons/fa";
import AddProduct from "../addProduct/AddProduct";

function Products({ token }) {
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState(false);

  const getProduct = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://telzone.pythonanywhere.com/product/all/?status=on_sale",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProduct();
  }, [token]);
  return (
    <div className="productSection">
      <div className="container">
        <div className="main_left">
          <div className="client_box">
            <div className="main_left-head">MIJOZ</div>
            <div className="clients box_link">
              <div>
                <Link to={"/client/all"}>Mijozlar</Link>
              </div>
              <p>
                <TiPlus />
                Qo'sh
              </p>
            </div>
          </div>
          <div className="product_box">
            <div className="main_left-head">MAHSULOT</div>
            <div className="expenses box_link">
              <div>Xarajatlar</div>
              <p>
                <TiPlus />
                Qo'sh
              </p>
            </div>
            <div className="products box_link">
              <div>
                <Link to={"/product/all"}>Mahsulotlar</Link>
              </div>
              <p>
                <TiPlus />
                Qo'sh
              </p>
            </div>
          </div>
          <div className="sale_box">
            <div className="main_left-head">Chegirma</div>
            <div className="sales box_link">
              <div>Chegirmalar</div>
              <p>
                <TiPlus />
                Qo'sh
              </p>
            </div>
          </div>
          <div className="use_box">
            <div className="main_left-head">FOYDALANUVCHI</div>
            <div className="users box_link">
              <div>Foydalanuvchilar</div>
              <p>
                <TiPlus />
                Qo'sh
              </p>
            </div>
          </div>
        </div>
        <div className="main_right">
          {addProduct && (
            <AddProduct
              token={token}
              addProduct={addProduct}
              setAddProduct={setAddProduct}
            />
          )}
          <div className="main_right-head">
            <h3>O'zgartirish uchun mahsulot tanlang</h3>
            <button
              className="client_add"
              onClick={() => {
                setAddProduct(true);
              }}
            >
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
                <th>Olingan Narx</th>
                <th>Foiz</th>
                <th>Sotish Narxi</th>
                <th>Soni</th>
                <th>Sana</th>
                <th>Holati</th>
              </tr>
            </thead>
            <tbody>
              {products?.results?.slice(0, 25).map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.purchase_price}</td>
                    <td>{item.percent}</td>
                    <td>{item.price}</td>
                    <td>{item.count}</td>
                    <td>{item.date}</td>
                    <td>{item.status}</td>
                    <td className="editClient_btn">
                      <FaEdit />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="client_count">{products?.count} ta mijoz</div>

          <div className="paginations">
            <div className="prev">
              {products.previous ? (
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
              {products.next ? (
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

export default Products;
