import React, { useEffect, useState } from "react";
import "./CurUser.css";
import { FaTimes } from "react-icons/fa";
import EditCurUser from "../editCurUser/EditCurUser";

function CurUser({ token, setLoading, curUser, setCurUser }) {
  const [curData, setCurData] = useState([]);
  const [editCurUser, setEditCurUser] = useState(false);
  const [changed, setChanged] = useState(false);
  const [editCurUserFirstname, setEditCurUserFirstname] = useState("");
  const [editCurUserLastname, setEditCurUserLastname] = useState("");
  const [editCurUsername, setEditCurUsername] = useState("");
  const [editCurUserRole, setEditCurUserRole] = useState("");
  const [editCurUserPassword, setEditCurUserPassword] = useState("");

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
      .then((result) => {
        setCurData(result);
        setEditCurUserFirstname(result.first_name);
        setEditCurUserLastname(result.last_name);
        setEditCurUsername(result.username);
        setEditCurUserRole(result.role);
        setLoading(false)
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setLoading(true)
    getData();
  }, [token, changed]);
  return (
    <div className="getCurrentUser">
      {editCurUser && (
        <EditCurUser
          token={token}
          setLoading={setLoading}
          editCurUser={editCurUser}
          setEditCurUser={setEditCurUser}
          editCurUserFirstname={editCurUserFirstname}
          setEditCurUserFirstname={setEditCurUserFirstname}
          editCurUserLastname={editCurUserLastname}
          setEditCurUserLastname={setEditCurUserLastname}
          editCurUsername={editCurUsername}
          setEditCurUsername={setEditCurUsername}
          editCurUserPassword={editCurUserPassword}
          setEditCurUserPassword={setEditCurUserPassword}
          editCurUserRole={editCurUserRole}
          setEditCurUserRole={setEditCurUserRole}
          setCurUser={setCurUser}
          curData={curData}
        />
      )}
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
            <h3>Ism:</h3>
            <p>{curData.first_name}</p>
            <h3>Familiya:</h3>
            <p>{curData.last_name}</p>
            <h3>Username:</h3>
            <p>{curData.username}</p>
            <h3>Rol:</h3>
            <p>{curData.role}</p>
            <div className="form_btn">
              <button
                onClick={() => {
                  setCurUser(false);
                }}
              >
                Ok
              </button>
              <button
                onClick={() => {
                  setEditCurUser(true);
                }}
              >
                Tahrirlash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurUser;
