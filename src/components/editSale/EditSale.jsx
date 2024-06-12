import React from "react";
import "./EditSale.css";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function EditSale({
  token,
  changed,
  setChanged,
  editSale,
  setEditSale,
  editProductName,
  setEditProductName,
  editClientName,
  setEditClientName,
  editCreditName,
  setEditCreditName,
  editSoldPrice,
  setEditSoldPrice,
  editInfo,
  setEditInfo,
  itemId,
}) {
  const editSaleData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

    const raw = JSON.stringify({
      product: [2],
      client: 2,
      sold_price: 2800000,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/sale/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };
  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri tahrirlang!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <div className="editSale">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setEditSale(false);
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
              editSaleData();
            } else {
              notify();
            }
          }}
        >
          <div>
            <h3>Mahsulot Nomi</h3>
            <Select
              isMulti
              name="products"
              className="basic-multi-select"
              classNamePrefix="select"
            />
            <h3>Mijoz</h3>
            <Select
              isMulti
              name="clients"
              className="basic-multi-select"
              classNamePrefix="select"
            />
            <h3>Nasiya Baza</h3>
            <Select
              isMulti
              name="credits"
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div>
            <h3>Narxi</h3>
            <input
              name="priceName"
              onChange={(e) => {
                setEditSoldPrice(e.target.value);
              }}
              type="number"
              placeholder="Mahsulot Narxi"
            />
            <h3>Izoh</h3>
            <textarea
              className="addSaleInfo"
              rows={6}
              onChange={(e) => {
                setEditInfo(e.target.value);
              }}
              type="textarea"
              placeholder="Izohingizni kiriting..."
            />
            <button>Tahrirlash</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSale;
