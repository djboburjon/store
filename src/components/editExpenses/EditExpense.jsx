import React from "react";
import "./EditExpense.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function EditExpense({
  baseUrl,
  token,
  setLoading,
  changed,
  setChanged,
  setEditExpense,
  editType,
  setEditType,
  editPrice,
  setEditPrice,
  itemId,
}) {
  const editData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      type: editType,
      price: editPrice,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}expense/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => {
        response.json();
        if (response.status === 200) {
          setEditExpense(false);
          setChanged(!changed);
          setLoading(false);
          notifySuccess();
        } else if (response.status === 403) {
          setLoading(false);
          notify("Sizga ruxsat etilmagan!");
        } else {
          setLoading(false);
          notify("Ma'lumotlarni to'g'ri tahrirlang!");
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
    toast.success("Ma'lumot tahrirlandi!", {
      position: "top-right",
      autoClose: 2000,
    });
  };
  return (
    <div className="editExpense">
      <div
        className="exit_btn"
        onClick={() => {
          setEditExpense(false);
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
            editData();
          }}
        >
          <h3>Xarajat Turi</h3>
          <input
            value={editType}
            onChange={(e) => {
              setEditType(e.target.value);
            }}
            required
            type="text"
            placeholder="Xarajat Turi"
          />
          <h3>Narxi</h3>
          <input
            value={editPrice}
            onChange={(e) => {
              setEditPrice(e.target.value);
            }}
            required
            type="number"
            placeholder="Narxi"
          />
          <button>Tahrirlash</button>
        </form>
      </div>
    </div>
  );
}

export default EditExpense;
