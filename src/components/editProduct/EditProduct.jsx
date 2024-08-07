import React, { useState } from "react";
import "./EditProduct.css";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function EditProduct({
  baseUrl,
  token,
  setLoading,
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
      `${baseUrl}product/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => {
        response.json()
        if(response.status === 200) {
          setEditProduct(false);
          setChanged(!changed);
          setLoading(false)
          notifySuccess();

        } else if (response.status === 403) {
          setLoading(false);
          notify("Sizga ruxsat etilmagan");
        } else {
          setLoading(false);
          notify("O'zgartirib bo'lmadi");
        }
      })
      .then((result) => {
      })
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
    toast.success("Ma'lumot tahrirlandi!", {
      position: "top-right",
      autoClose: 2000,
    });
  };
  return (
    <div className="editProduct">
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
            setLoading(true)
            editData();
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
                  setEditPrice("0");
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
                  setEditPrecent("0");
                } else {
                  setNewPrice("0");
                  setEditPrice("0");
                }
              }}
              type="number"
              placeholder="0"
            />
            <h3>Mahsulot Imei</h3>
            <input
              value={editImei}
              onChange={(e) => {
                setEditImei(e.target.value);
              }}
              required
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
