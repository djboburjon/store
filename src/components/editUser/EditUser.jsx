import React from "react";
import "./EditUser.css";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function EditUser({
  token,
  setLoading,
  user,
  setUser,
  editUser,
  setEditUser,
  changed,
  itemId,
  userType,
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
  dashboardView,
  setDashboardView,
  prodCreate,
  setProdCreate,
  prodUpdate,
  setProdUpdate,
  prodView,
  setProdView,
  clientCreate,
  setClientCreate,
  clientUpdate,
  setClientUpdate,
  clientView,
  setClientView,
  saleCreate,
  setSaleCreate,
  saleUpdate,
  setSaleUpdate,
  saleView,
  setSaleView,
  creditCreate,
  setCreditCreate,
  creditUpdate,
  setCreditUpdate,
  creditView,
  setCreditView,
  userCreate,
  setUserCreate,
  userUpdate,
  setUserUpdate,
  userView,
  setUserView,
  expenseCreate,
  setExpenseCreate,
  expenseUpdate,
  setExpenseUpdate,
  expenseView,
  setExpenseView,
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
      .then((response) => {
        response.json();
        if (response.status === 200) {
          if (userType == "worker") {
            editPermission();
          }
          setEditUserpassword("");
          setEditUser(false);
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

  const editPermission = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      product_can_create: prodCreate,
      product_can_update: prodUpdate,
      product_can_view: prodView,
      client_can_create: clientCreate,
      client_can_update: clientUpdate,
      client_can_view: clientView,
      sale_can_create: saleCreate,
      sale_can_update: saleUpdate,
      sale_can_view: saleView,
      credit_base_can_create: creditCreate,
      credit_base_can_update: creditUpdate,
      credit_base_can_view: creditView,
      user_can_create: userCreate,
      user_can_update: userUpdate,
      user_can_view: userView,
      dashboard_can_view: dashboardView,
      expense_can_create: expenseCreate,
      expense_can_update: expenseUpdate,
      expense_can_view: expenseView,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/user/update/permissions/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => response.json())
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
    toast.success("Ma'lumot tahrirlandi!", {
      position: "top-right",
      autoClose: 2000,
    });
  };
  return (
    <div className="editUser">
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
              setLoading(true);
              editData();
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
              required
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
              setLoading(true);
              if (editUsername.length != 0) {
                editData();
                editPermission();
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
                  required
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
                  <span
                    onClick={() => {
                      setDashboardView((prev) => !prev);
                    }}
                  >
                    Dashboard ko'rish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={dashboardView}
                    onChange={(e) => {
                      setDashboardView(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setProdCreate((prev) => !prev);
                    }}
                  >
                    Mahsulot qo'shishish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={prodCreate}
                    onChange={(e) => {
                      setProdCreate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setProdUpdate((prev) => !prev);
                    }}
                  >
                    Mahsulot tahrirlash
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={prodUpdate}
                    onChange={(e) => {
                      setProdUpdate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setProdView((prev) => !prev);
                    }}
                  >
                    Mahsulot ko'rish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={prodView}
                    onChange={(e) => {
                      setProdView(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setClientCreate((prev) => !prev);
                    }}
                  >
                    Mijoz qo'shish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={clientCreate}
                    onChange={(e) => {
                      setClientCreate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setClientUpdate((prev) => !prev);
                    }}
                  >
                    Mijoz tahrirlash
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={clientUpdate}
                    onChange={(e) => {
                      setClientUpdate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setClientView((prev) => !prev);
                    }}
                  >
                    Mijoz ko'rish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={clientView}
                    onChange={(e) => {
                      setClientView(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setSaleCreate((prev) => !prev);
                    }}
                  >
                    Chegirma qo'shish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={saleCreate}
                    onChange={(e) => {
                      setSaleCreate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setSaleUpdate((prev) => !prev);
                    }}
                  >
                    Chegirma tahrirlash
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={saleUpdate}
                    onChange={(e) => {
                      setSaleUpdate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setSaleView((prev) => !prev);
                    }}
                  >
                    Chegirma ko'rish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={saleView}
                    onChange={(e) => {
                      setSaleView(e.target.checked);
                    }}
                  />
                </p>
              </div>
              <div className="editBox3">
                <p>
                  <span
                    onClick={() => {
                      setCreditCreate((prev) => !prev);
                    }}
                  >
                    Kredit qo'shish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={creditCreate}
                    onChange={(e) => {
                      setCreditCreate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setCreditUpdate((prev) => !prev);
                    }}
                  >
                    Kredit tahrirlash
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={creditUpdate}
                    onChange={(e) => {
                      setCreditUpdate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setCreditView((prev) => !prev);
                    }}
                  >
                    Kredit ko'rish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={creditView}
                    onChange={(e) => {
                      setCreditView(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setUserCreate((prev) => !prev);
                    }}
                  >
                    User qo'shish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={userCreate}
                    onChange={(e) => {
                      setUserCreate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setUserUpdate((prev) => !prev);
                    }}
                  >
                    User tahrirlash
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={userUpdate}
                    onChange={(e) => {
                      setUserUpdate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setUserView((prev) => !prev);
                    }}
                  >
                    User ko'rish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={userView}
                    onChange={(e) => {
                      setUserView(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setExpenseCreate((prev) => !prev);
                    }}
                  >
                    Xarajat qo'shish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={expenseCreate}
                    onChange={(e) => {
                      setExpenseCreate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setExpenseUpdate((prev) => !prev);
                    }}
                  >
                    Xarajat tahrirlash
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={expenseUpdate}
                    onChange={(e) => {
                      setExpenseUpdate(e.target.checked);
                    }}
                  />
                </p>
                <p>
                  <span
                    onClick={() => {
                      setExpenseView((prev) => !prev);
                    }}
                  >
                    Xarajat ko'rish
                  </span>{" "}
                  <Checkbox
                    {...label}
                    checked={expenseView}
                    onChange={(e) => {
                      setExpenseView(e.target.checked);
                    }}
                  />
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
