import React, { useEffect } from "react";
import "./EditClients.css";
import { FaTimes } from "react-icons/fa";

function EditClients({
  token,
  editClient,
  setEditClient,
  editName,
  editNumber,
  setEditName,
  setEditNumber,
  itemId,
  setNewClient
}) {
  
  const editData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

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
      .then((response) => response.json())
      .then((result) => setNewClient(result))
      .catch((error) => console.error(error));
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
            editData();
            setEditClient(false);
          }}
        >
          <h3>F.I.Sh</h3>
          <input
            value={editName}
            onChange={(e) => {
              setEditName(e.target.value);
            }}
            type="text"
            placeholder="F.I.Sh kiriting"
          />
          <h3>Telefon Raqam</h3>
          <input
            value={editNumber}
            onChange={(e) => {
              setEditNumber(e.target.value);
            }}
            type="text"
            placeholder="Raqam kiriting"
          />
          <button>Tahrirlash</button>
        </form>
      </div>
    </div>
  );
}

export default EditClients;
