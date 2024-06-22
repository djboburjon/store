import React from "react";
import "./EditUser.css";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function EditUser({
  token,
  user,
  setUser,
  editUser,
  setEditUser,
  changed,
  setChanged,
  editUsername,
  setEditUsername,
  editName,
  setEditName,
  editLastName,
  setEditLastName,
  editUserpassword,
  setEditUserpassword,
  editUserRole,
  setEditUserRole,
  itemId,
}) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const editData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = editUserpassword
      ? JSON.stringify({
          first_name: editName,
          last_name: editLastName,
          username: editUsername,
          password: editUserpassword,
          role: editUserRole,
        })
      : JSON.stringify({
          first_name: editName,
          last_name: editLastName,
          username: editUsername,
          role: editUserRole,
        });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/user/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEditUser(false);
        setChanged(!changed);
      })
      .catch((error) => console.error(error));
  };

  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri tahrirlang!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <div className="editUser">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setEditUser(false);
        }}
      >
        <FaTimes />
      </div>
      <div className="container">
        {editUserRole == "admin" ? (
          <form
            className="form"
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              if (editUsername.length != 0) {
                editData();
              } else {
                notify();
              }
            }}
          >
            <h3>Ism</h3>
            <input
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
              type="text"
              placeholder="Ism kiriting"
            />
            <h3>Familiya</h3>
            <input
              value={editLastName}
              onChange={(e) => {
                setEditLastName(e.target.value);
              }}
              type="text"
              placeholder="Familiya kiriting"
            />
            <h3>Rol</h3>
            <select
              onChange={(e) => {
                setEditUserRole(e.target.value);
              }}
            >
              <option value="admin">Admin</option>
              <option value="worker">Ishchi</option>
            </select>
            <h3>Username</h3>
            <input
              value={editUsername}
              onChange={(e) => {
                setEditUsername(e.target.value);
              }}
              type="text"
              placeholder="Username kiriting"
            />
            <h3>Parol</h3>
            <input
              value={editUserpassword}
              onChange={(e) => {
                setEditUserpassword(e.target.value);
              }}
              type="text"
              placeholder="Parol kiriting"
            />

            <button>Tahrirlash</button>
          </form>
        ) : (
          <form
            className="form"
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              if (editUsername.length != 0) {
                editData();
              } else {
                notify();
              }
            }}
          >
            <div className="editBox">
              <div className="editBox1">
                <h3>Ism</h3>
                <input
                  value={editName}
                  onChange={(e) => {
                    setEditName(e.target.value);
                  }}
                  type="text"
                  placeholder="Ism kiriting"
                />
                <h3>Familiya</h3>
                <input
                  value={editLastName}
                  onChange={(e) => {
                    setEditLastName(e.target.value);
                  }}
                  type="text"
                  placeholder="Familiya kiriting"
                />
                <h3>Rol</h3>
                <select
                  onChange={(e) => {
                    setEditUserRole(e.target.value);
                  }}
                >
                  <option value="worker">Ishchi</option>
                  <option value="admin">Admin</option>
                </select>
                <h3>Username</h3>
                <input
                  value={editUsername}
                  onChange={(e) => {
                    setEditUsername(e.target.value);
                  }}
                  type="text"
                  placeholder="Username kiriting"
                />
                <h3>Parol</h3>
                <input
                  value={editUserpassword}
                  onChange={(e) => {
                    setEditUserpassword(e.target.value);
                  }}
                  type="text"
                  placeholder="Parol kiriting"
                />
              </div>
              <div className="editBox2">
                <p>
                  <span>Dashboard ko'rish</span>{" "}
                  <Checkbox {...label} defaultChecked />
                </p>
                <p>
                  <span>Mahsulot qo'sh</span>{" "}
                  <Checkbox {...label} defaultChecked />
                </p>
                <p>
                  <span>Mahsulot tahrir</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>Mahsulot ko'rish</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>Mijoz qo'sh</span>{" "}
                  <Checkbox {...label} defaultChecked />
                </p>
                <p>
                  <span>Mijoz tahrir</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>Mijoz ko'rish</span>{" "}
                  <Checkbox {...label} defaultChecked />
                </p>
                <p>
                  <span>Chegirma qo'sh</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>Chegirma tahrir</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>Chegirma ko'rish</span>{" "}
                  <Checkbox {...label} defaultChecked />
                </p>
              </div>
              <div className="editBox3">
                <p>
                  <span>Kredit qo'sh</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>Kredit tahrir</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>Kredit ko'rish</span>{" "}
                  <Checkbox {...label} defaultChecked />
                </p>
                <p>
                  <span>User qo'sh</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>User tahrir</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>User ko'rish</span>{" "}
                  <Checkbox {...label} defaultChecked />
                </p>
                <p>
                  <span>Xarajat qo'sh</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>Xarajat tahrir</span> <Checkbox {...label} />
                </p>
                <p>
                  <span>Xarajat ko'rish</span>{" "}
                  <Checkbox {...label} defaultChecked />
                </p>
                <button>Tahrirlash</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditUser;
