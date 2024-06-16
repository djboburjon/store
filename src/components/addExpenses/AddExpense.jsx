import React, { useState } from "react";
import "./AddExpense.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function AddExpense({ token, addExpense, setAddExpense, changed, setChanged }) {
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const createData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      type: type,
      price: price,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/expense/create/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAddExpense(false);
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
    <div className="addClient">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setAddExpense(false);
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
            if (type.length != 0 && price.length != 0) {
              createData();
            } else {
              notify();
            }
          }}
        >
          <h3>Maxsulot Turi</h3>
          <input
            onChange={(e) => {
              setType(e.target.value);
            }}
            type="text"
            placeholder="Turi"
          />
          <h3>Narxi</h3>
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            type="number"
            placeholder="Maxsulot Narxi"
          />
          <button>Maxsulot Qo'shish</button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
