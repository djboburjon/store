import React, { useState } from "react";
import "./AddProduct.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function AddProduct({ baseUrl, token, setLoading, setAddProduct, changed, setChanged }) {
  const [name, setName] = useState("");
  const [prchPrice, setPrchPrice] = useState("");
  const [percent, setPercent] = useState(0);
  const [price, setPrice] = useState(0);
  const [imei, setImei] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [rawValue, setRawValue] = useState("");

  const createProduct = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: name,
      purchase_price: rawValue,
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

    fetch(`${baseUrl}product/create/`, requestOptions)
      .then((response) => {
        response.json();
        if (response.status === 200) {
          setAddProduct(false);
          setChanged(!changed);
          setLoading(false);
          notifySuccess();
        } else if (response.status === 403) {
          setLoading(false);
          notify("Sizga ruxsat etilmagan");
        } else {
          setLoading(false);
          notify("Ma'lumotlarni to'g'ri kiriting");
        }
      })
      .then((result) => {})
      .catch((error) => {
        setLoading(false);
        notify("Nimadir xato");
        console.error(error);
      });
  };
  const notify = (text) => {
    toast.warning(text, {
      position: "top-right",
      autoClose: 3000,
    });
  };
  const notifySuccess = () => {
    toast.success("Ma'lumot qo'shildi!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleChange = (e) => {
    let inputValue = e.target.value.replace(/\s/g, ""); // Remove existing spaces
    setRawValue(inputValue);

    let formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Add space before every three digits
    setDisplayValue(formattedValue);
  };
  return (
    <div className="addProduct">
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
            setLoading(true);
            createProduct();
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
            value={displayValue}
              onChange={
                handleChange
              }
              type="text"
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
            <h3>Mahsulot Imei</h3>
            <input
              onChange={(e) => {
                setImei(e.target.value);
              }}
              required
              type="number"
              placeholder="123456789"
            />
            <button>Qo'shish</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
