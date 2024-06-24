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
      .then((response) => response.json())
      .then((result) => {
        if (result.response == "Success") {
          if (result.phone_number) {
            throw new Error("xatolik");
          }
          setAddClient(false);
          setChanged(!changed);
          notifySuccess()
          setLoading(false)
        } else {
          notify();
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Bu nomer orqali avval ro'yxatdan o'tilgan!", {
          position: "top-right",
          autoClose: 2000,
        });
        setLoading(false)
      });
  };

  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri kiriting!", {
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
            setLoading(true)
            createData();
          }}
        >
          <h3>F.I.Sh</h3>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="F.I.Sh kiriting"
          />
          <h3>Telefon Raqam +998</h3>
          <input
            onChange={(e) => {
              setNumber(e.target.value);
            }}
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
