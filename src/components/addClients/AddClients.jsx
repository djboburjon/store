import React, { useState } from "react";
import "./AddClients.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function AddClients({
  token,
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
        console.log(result);
        if (result.phone_number) {
          throw new Error("xatolik");
        }
        // notifySuccess()
        setAddClient(false);
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
      <ToastContainer />
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
            if (number.length == 9) {
              createData();
            } else {
              notify();
            }
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
