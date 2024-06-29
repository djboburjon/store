import React, { useEffect } from "react";
import "./EditClients.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function EditClients({
  token,
  setLoading,
  editClient,
  setEditClient,
  editName,
  editNumber,
  setEditName,
  setEditNumber,
  itemId,
  setNewClient,
  changed,
  setChanged,
}) {
  const editData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      FIO: editName,
      phone_number: editNumber,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/client/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => {
        response.json();
        if (response.status === 200) {
          setEditClient(false);
          setChanged(!changed);
          setLoading(false);
          notifySuccess();
        } else if (response.status === 403) {
          setLoading(false);
          notify("Sizga ruxsat etilmagan");
        } else if(editNumber.length != 9) {
          setLoading(false)
          notify("Nomerni to'g'ri kiriting")
        } else if (response.status === 400) {
          setLoading(false);
          notify("Bu nomer orqali avval ro'yxatdan o'tilgan");
        } else {
          setLoading(false);
          notify("Ma'lumotlarni to'g'ri kiriting");
        }
      })
      .then((result) => {})
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
    toast.success("Tahrirlandi!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="editClient">
      <div
        className="exit_btn"
        onClick={() => {
          setEditClient(false);
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
          <h3>F.I.Sh</h3>
          <input
            value={editName}
            onChange={(e) => {
              setEditName(e.target.value);
            }}
            required
            type="text"
            placeholder="F.I.Sh kiriting"
          />
          <h3>Telefon Raqam +998</h3>
          <input
            value={editNumber}
            onChange={(e) => {
              setEditNumber(e.target.value);
            }}
            required
            type="number"
            placeholder="Raqam kiriting"
          />
          <button>Tahrirlash</button>
        </form>
      </div>
    </div>
  );
}

export default EditClients;
