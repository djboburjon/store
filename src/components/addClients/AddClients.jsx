import React, { useState } from "react";
import "./AddClients.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function AddClients({
  token,
  setLoading,
  setNewClient,
  setAddClient,
  changed,
  setChanged,
}) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const createData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      FIO: name,
      phone_number: number,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/client/create/", requestOptions)
      .then((response) => {
        response.json();
        if (response.status === 200) {
          setAddClient(false);
          setChanged(!changed);
          notifySuccess();
          setLoading(false);
        } else if (response.status === 403) {
          setLoading(false);
          notify("Sizga ruxsat etilmagan");
        } else if (number.length != 9) {
          setLoading(false);
          notify("Nomerni to'g'ri kiriting");
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
    toast.success("Mijoz qo'shildi!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="addClient">
      <div
        className="exit_btn"
        onClick={() => {
          setAddClient(false);
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
            createData();
          }}
        >
          <h3>F.I.Sh</h3>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            type="text"
            placeholder="F.I.Sh kiriting"
          />
          <h3>Telefon Raqam +998</h3>
          <input
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            required
            type="number"
            placeholder="91 123 45 67"
          />
          <button>Mijoz Qo'shish</button>
        </form>
      </div>
    </div>
  );
}

export default AddClients;
