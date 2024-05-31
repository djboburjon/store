import React, { useState } from "react";
import "./EditProduct.css";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function EditProduct({
  token,
  changed,
  setChanged,
  editProduct,
  setEditProduct,
  editName,
  setEditName,
  editPrchPrice,
  setEditPrchPrice,
  editPrecent,
  setEditPrecent,
  editPrice,
  setEditPrice,
  editCount,
  setEditCount,
  editImei,
  setEditImei,
  itemId,
}) {
  const [newPrice, setNewPrice] = useState("0");
  const [newPrecent, setNewPrecent] = useState("0");
  const editData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: editName,
      count: editCount,
      purchase_price: editPrchPrice,
      percent: editPrecent,
      price: editPrice,
      imei: editImei,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/product/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.imei) {
          throw new Error("xatolik");
        }
        setEditProduct(false);
        setChanged(!changed);
      })
      .catch((error) => {
        console.error(error);
        console.log("xatolik");
        toast.error("Bu nomer orqali avval ro'yxatdan o'tilgan!", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };
  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri tahrirlang!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <div className="editProduct">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setEditProduct(false);
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
            if (editImei.length != 0 && editName.length != 0) {
              editData();
            } else {
              notify();
            }
          }}
        >
          <div>
            <h3>Nomi</h3>
            <input
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
              type="text"
              placeholder="Mahsulot Nomi"
            />
            <h3>Olingan Narx</h3>
            <input
              value={editPrchPrice}
              onChange={(e) => {
                setEditPrchPrice(e.target.value);
              }}
              type="number"
              placeholder="100000"
            />
            <h3>Ustama Foiz</h3>
            <input
              className={newPrice == 0 ? "" : "percent_inp"}
              name="percentName"
              onChange={(e) => {
                if (newPrice == 0) {
                  setNewPrecent(e.target.value);
                  setEditPrecent(e.target.value);
                  setEditPrice(editPrchPrice * (1 + e.target.value/100))
                } else {
                  setNewPrecent("0");
                  setEditPrecent("0");
                }
              }}
              type="number"
              placeholder="0"
            />
          </div>
          <div>
            <h3>Sotish Narxi</h3>
            <input
              className={newPrecent == 0 ? "" : "price_inp"}
              name="priceName"
              onChange={(e) => {
                if (newPrecent == 0) {
                  setNewPrice(e.target.value);
                  setEditPrice(e.target.value);
                  setEditPrecent((e.target.value / editPrchPrice) * 100 - 100)
                } else {
                  setNewPrice("0");
                  setEditPrice("0");
                }
              }}
              type="number"
              placeholder="0"
            />
            <h3>Mahsulot Soni</h3>
            <input
              value={editCount}
              onChange={(e) => {
                setEditCount(e.target.value);
              }}
              type="number"
              placeholder="50"
            />
            <h3>Mahsulot Imei</h3>
            <input
              value={editImei}
              onChange={(e) => {
                setEditImei(e.target.value);
              }}
              type="number"
              placeholder="123456789"
            />
            <button>Tahrirlash</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
