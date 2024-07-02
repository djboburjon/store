import React, { useState } from "react";
import "./EditCredit.css";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function EditCredit({
  baseUrl,
  token,
  setLoading,
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
      `${baseUrl}credit_base/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => {
        response.json();
        if (response.status === 200) {
          setEditCredit(false);
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
      .then((result) => {
      })
      .catch((error) => {
        setLoading(false);
        notify("Nimadir xato");
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
    <div className="editCredit">
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
            setLoading(true);
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
              required
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
