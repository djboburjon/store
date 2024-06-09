import React, { useState } from "react";
import "./AddSale.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function AddSale({ token, addSale, setAddSale, changed, setChanged }) {
  const [prodName, setProdName] = useState([]);
  const [client, setClient] = useState("");
  const [creditBaze, setCreditBaze] = useState([]);
  const [prise, setPrise] = useState("");
  const [info, setInfo] = useState("");

  const createSale = () => {};
  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri kiriting!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <div className="addSale">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setAddSale(false);
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
            if (client.length != 0 && prodName.length != 0) {
              createSale();
            } else {
              notify();
            }
          }}
        >
          <div>
            <h3>Mahsulot Nomi</h3>
            <input
              onChange={(e) => {
                setProdName(e.target.value);
              }}
              type="text"
              placeholder="Mahsulot Nomi"
            />
            <h3>Mijoz</h3>
            <input
              onChange={(e) => {
                setClient(e.target.value);
              }}
              type="text"
              placeholder="Mijozlar"
            />
            <h3>Nasiya Baza</h3>
            <input
              onChange={(e) => {
                setCreditBaze(e.target.value);
              }}
              type="text"
              placeholder="Credit Baza"
            />
          </div>
          <div>
            <h3>Narxi</h3>
            <input
              name="priceName"
              onChange={(e) => {
                setPrise(e.target.value);
              }}
              type="number"
              placeholder="Mahsulot Narxi"
            />
            <h3>Izoh</h3>
            <textarea
              className="addSaleInfo"
              rows={6}
              onChange={(e) => {
                setInfo(e.target.value);
              }}
              type="textarea"
              placeholder="Izohingizni kiriting..."
            />
            <button>Qo'shish</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSale;
