import React, { useState } from "react";
import "./EditCredit.css"
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function EditCredit({
  token,
  changed,
  setChanged,
  editCredit,
  setEditCredit,
  editName,
  setEditName,
  itemId,
}) {
  const editData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: editName,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/credit_base/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEditCredit(false);
        setChanged(!changed);
      })
      .catch((error) => console.error(error));
  };
  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri tahrirlang!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <div className="editCredit">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setEditCredit(false);
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
            if (editName.length != 0) {
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
              placeholder="Credit Nomi"
            />
            <button>Tahrirlash</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCredit;