import React, { useState } from "react";
import "./AddProduct.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function AddProduct({ token, setAddProduct, changed, setChanged }) {
  const [name, setName] = useState("");
  const [prchPrice, setPrchPrice] = useState("");
  const [percent, setPercent] = useState("0");
  const [price, setPrice] = useState("0");
  const [count, setCount] = useState("");
  const [imei, setImei] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const createProduct = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: name,
      count: count,
      purchase_price: prchPrice,
      percent: percent,
      price: price,
      imei: imei,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/product/create/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAddProduct(false);
        setChanged(!changed);
      })
      .catch((error) => console.error(error));
  };
  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri kiriting!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <div className="addProduct">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setAddProduct(false);
        }}
      >
        <FaTimes />
      </div>
      <div className="container">
        <form
          className="form"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            if (imei.length != 0) {
              createProduct();
            } else {
              notify()
            }
          }}
        >
          <div>
            <h3>Nomi</h3>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Mahsulot Nomi"
            />
            <h3>Olingan Narx</h3>
            <input
              onChange={(e) => {
                setPrchPrice(e.target.value);
              }}
              type="number"
              placeholder="100000"
            />
            <h3>Ustama Foiz</h3>
            <input 
              className={price == 0 ? "" : "percent_inp"}
              name="percentName"
              onChange={(e) => {
                if (price == 0) {
                  setPercent(e.target.value);
                } else {
                  setPercent("0");
                }
              }}
              type="number"
              placeholder="30"
            />
          </div>
          <div>
            <h3>Sotish Narxi</h3>
            <input
              className={percent == 0 ? "" : "price_inp"}
              name="priceName"
              onChange={(e) => {
                if (percent == 0) {
                  setPrice(e.target.value);
                } else {
                  setPrice("0");
                }
              }}
              type="number"
              placeholder="130000"
            />
            <h3>Mahsulot Soni</h3>
            <input
              onChange={(e) => {
                setCount(e.target.value);
              }}
              type="number"
              placeholder="50"
            />
            <h3>Mahsulot Imei</h3>
            <input
              onChange={(e) => {
                setImei(e.target.value);
              }}
              type="number"
              placeholder="123456789"
            />
            <button>Mahsulot Qo'shish</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
