import React, { useState } from "react";
import "./AddCredit.css";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function AddCredit({ baseUrl, token, setLoading, setAddCredit, changed, setChanged }) {
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
      `${baseUrl}credit_base/create/`,
      requestOptions
    )
      .then((response) => {
        response.json();
        if (response.status === 200) {
          setAddCredit(false);
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
    toast.success("Ma'lumot qo'shildi!", {
      position: "top-right",
      autoClose: 2000,
    });
  };
  return (
    <div className="addCredit">
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
            setLoading(true);
            createCredit();
          }}
        >
          <div>
            <h3>Nomi</h3>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
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
