import React, { useEffect, useState } from "react";
import "./CurUser.css";
import { FaTimes } from "react-icons/fa";

function CurUser({ token, setLoading, curUser, setCurUser }) {
  const [curData, setCurData] = useState([]);
  const [addCurUser, setAddCurUser] = useState(false);
  const [editCurUser, setEditCurUser] = useState(false);
  const [changed, setChanged] = useState(false);

  const getData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/user/current/", requestOptions)
      .then((response) => response.json())
      .then((result) => setCurData(result))
      .catch((error) => console.error(error));
  };

  console.log(curUser);
  console.log(curData);

  useEffect(() => {
    getData();
  }, [token, changed]);
  return (
    <div className="getCurrentUser">
      <div
        className="exit_btn"
        onClick={() => {
          setCurUser(false);
        }}
      >
        <FaTimes />
      </div>
      <div className="container">
        {curData && (
          <div className="form">
            <h3>Ism</h3>
            <p>{curData.first_name}</p>
            <h3>Familiya</h3>
            <p>{curData.last_name}</p>
            <button>Tahrirlash</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurUser;
