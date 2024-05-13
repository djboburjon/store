import React, { useState } from "react";
import "./AddClients.css";
import { FaTimes } from "react-icons/fa";

function AddClients( {token, setNewClient, setAddClient}) {

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const createData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

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
      .then((result) => setNewClient(result))
      .catch((error) => console.error(error));
  };

  return (
    <div className="addClient">
      <div
        className="exit_btn"
        onClick={() => {
          setAddClient(false)
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
            createData()
            setAddClient(false);
          }}
        >
          <h3>F.I.Sh</h3>
          <input onChange={(e) => {
            setName(e.target.value)
          }} type="text" placeholder="F.I.Sh kiriting" />
          <h3>Telefon Raqam +998</h3>
          <input onChange={(e) => {
            setNumber(e.target.value)
          }} type="number" placeholder="91 123 45 67" />
          <button>Mijoz Qo'shish</button>
        </form>
      </div>
    </div>
  );
}

export default AddClients;
