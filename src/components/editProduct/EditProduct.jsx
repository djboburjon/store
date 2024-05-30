import React from "react";
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
  itemId
}) {
  const editData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

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
          throw new Error("xatolik")
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
            if (imei.length != 0) {
              editData();
            } else {
              notify()
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
              value={editPrecent}
              className={price == 0 ? "" : "percent_inp"}
              name="percentName"
              onChange={(e) => {
                if (price == 0) {
                  setEditPrecent(e.target.value);
                } else {
                  setEditPrecent("0");
                }
              }}
              type="number"
              placeholder="30"
            />
          </div>
          <div>
            <h3>Sotish Narxi</h3>
            <input
              value={editPrice}
              className={percent == 0 ? "" : "price_inp"}
              name="priceName"
              onChange={(e) => {
                if (percent == 0) {
                  setEditPrice(e.target.value);
                } else {
                  setEditPrice("0");
                }
              }}
              type="number"
              placeholder="130000"
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
