import React, { useState } from "react";
import "./AddCredit.css"
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function AddCredit({ token, setAddCredit, changed, setChanged }) {
  const [name, setName] = useState("");

  const createCredit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: name,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://telzone.pythonanywhere.com/credit_base/create/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setAddCredit(false);
        setChanged(!changed)
      })
      .catch((error) => console.error(error));
  };
  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri kiriting!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <div className="addCredit">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setAddCredit(false);
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
            if (name.length != 0) {
              createCredit()
            } else {
              notify()
            }
          }}
        >
          <div>
            <h3>Nomi</h3>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Credit Nomi"
            />
            <button>Credit Qo'shish</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCredit;