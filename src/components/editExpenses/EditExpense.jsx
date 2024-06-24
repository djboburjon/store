import React from "react";
import "./EditExpense.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function EditExpense({
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
      `https://telzone.pythonanywhere.com/expense/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response == "Success") {
          setEditExpense(false);
          setChanged(!changed);
          setLoading(false)
          notifySuccess();
        } else {
          setLoading(false)
          notify();
        }
      })
      .catch((error) => console.error(error));
  };
  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri tahrirlang!", {
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
            setLoading(true)
            editData();
          }}
        >
          <h3>Xarajat Turi</h3>
          <input
            value={editType}
            onChange={(e) => {
              setEditType(e.target.value);
            }}
            type="text"
            placeholder="Xarajat Turi"
          />
          <h3>Narxi</h3>
          <input
            value={editPrice}
            onChange={(e) => {
              setEditPrice(e.target.value);
            }}
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
