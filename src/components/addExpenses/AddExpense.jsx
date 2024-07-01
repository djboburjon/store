import React, { useState } from "react";
import "./AddExpense.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function AddExpense({
  token,
  setLoading,
  addExpense,
  setAddExpense,
  changed,
  setChanged,
}) {
  const [type, setType] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [rawValue, setRawValue] = useState("");

  const createData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      type: type,
      price: rawValue,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/expense/create/", requestOptions)
      .then((response) => {
        response.json();
        if (response.status === 200) {
          setAddExpense(false);
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
        notify("Nimadir xato")
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
    <div className="addExpense">
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
            setLoading(true);
            createData();
          }}
        >
          <h3>Maxsulot Turi</h3>
          <input
            onChange={(e) => {
              setType(e.target.value);
            }}
            required
            type="text"
            placeholder="Turi"
          />
          <h3>Narxi</h3>
          <input
            value={displayValue}
            onChange={handleChange}
            required
            type="text"
            placeholder="Maxsulot Narxi"
          />
          <button>Xarajat Qo'shish</button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
