import React, { useEffect, useState } from "react";
import "./User.css";
import { Link } from "react-router-dom";
import { FaEdit, FaSearch } from "react-icons/fa";
import EditUser from "../editUser/EditUser";
import { TiPlus } from "react-icons/ti";
import Switch from "@mui/material/Switch";
import AddUser from "../addUser/AddUser";

function User({ token, setLoading }) {
  const [user, setUser] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editName, setEditName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editUserpassword, setEditUserpassword] = useState("");
  const [editUserRole, setEditUserRole] = useState("");
  const [itemId, setItemId] = useState(0);
  const [changed, setChanged] = useState(false);
  const [userType, setUserType] = useState("admin");
  const [didHanSoloShootFirst, setDidHanSoloShootFirst] = useState(true);
  const [dashboardView, setDashboardView] = useState(true);
  const [prodCreate, setProdCreate] = useState(false);
  const [prodUpdate, setProdUpdate] = useState(false);
  const [prodView, setProdView] = useState(true);
  const [clientCreate, setClientCreate] = useState(false);
  const [clientUpdate, setClientUpdate] = useState(false);
  const [clientView, setClientView] = useState(true);
  const [saleCreate, setSaleCreate] = useState(false);
  const [saleUpdate, setSaleUpdate] = useState(false);
  const [saleView, setSaleView] = useState(true);
  const [creditCreate, setCreditCreate] = useState(false);
  const [creditUpdate, setCreditUpdate] = useState(false);
  const [creditView, setCreditView] = useState(true);
  const [userCreate, setUserCreate] = useState(false);
  const [userUpdate, setUserUpdate] = useState(false);
  const [userView, setUserView] = useState(true);
  const [expenseCreate, setExpenseCreate] = useState(false);
  const [expenseUpdate, setExpenseUpdate] = useState(false);
  const [expenseView, setExpenseView] = useState(true);
  const [lastItem, setLastItem] = useState(null);

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  const getUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/user/all/?enum=${userType}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setUser(result);
        // if (userType == "worker") {
        //   setLastItem(result?.count - 1);
        //   setItemId(result?.results[lastItem]?.id)
        //   setEditUser(true)
        //   console.log(itemId);
        // }
      })
      .catch((error) => console.error(error));
  };

  function toggleDidHanSoloShootFirst() {
    if (didHanSoloShootFirst === true) {
      setDidHanSoloShootFirst(false);
      setUserType("worker");
      setChanged(!changed);
    } else if (didHanSoloShootFirst === false) {
      setDidHanSoloShootFirst(true);
      setUserType("admin");
      setChanged(!changed);
    }
  }

  useEffect(() => {
    getUser();
  }, [token, changed, lastItem]);

  const getItemData = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://telzone.pythonanywhere.com/user/?pk=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEditUsername(result.username);
        setEditName(result.first_name);
        setEditLastName(result.last_name);
        setEditUserRole(result.role);
        if (userType == "worker") {
          setProdCreate(result.permission_fields.product_can_create);
          setProdUpdate(result.permission_fields.product_can_update);
          setProdView(result.permission_fields.product_can_view);
          setClientCreate(result.permission_fields.client_can_create);
          setClientUpdate(result.permission_fields.client_can_update);
          setClientView(result.permission_fields.client_can_view);
          setSaleCreate(result.permission_fields.sale_can_create);
          setSaleUpdate(result.permission_fields.sale_can_update);
          setSaleView(result.permission_fields.sale_can_view);
          setCreditCreate(result.permission_fields.credit_base_can_create);
          setCreditUpdate(result.permission_fields.credit_base_can_update);
          setCreditView(result.permission_fields.credit_base_can_view);
          setUserCreate(result.permission_fields.user_can_create);
          setUserUpdate(result.permission_fields.user_can_update);
          setUserView(result.permission_fields.user_can_view);
          setExpenseCreate(result.permission_fields.expense_can_create);
          setExpenseUpdate(result.permission_fields.expense_can_update);
          setExpenseView(result.permission_fields.expense_can_view);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {editUser && (
        <EditUser
          token={token}
          setLoading={setLoading}
          user={user}
          setUser={setUser}
          editUser={editUser}
          setEditUser={setEditUser}
          changed={changed}
          setChanged={setChanged}
          itemId={itemId}
          userType={userType}
          editUsername={editUsername}
          setEditUsername={setEditUsername}
          editName={editName}
          setEditName={setEditName}
          editLastName={editLastName}
          setEditLastName={setEditLastName}
          editUserpassword={editUserpassword}
          setEditUserpassword={setEditUserpassword}
          editUserRole={editUserRole}
          setEditUserRole={setEditUserRole}
          dashboardView={dashboardView}
          setDashboardView={setDashboardView}
          prodCreate={prodCreate}
          setProdCreate={setProdCreate}
          prodUpdate={prodUpdate}
          setProdUpdate={setProdUpdate}
          prodView={prodView}
          setProdView={setProdView}
          clientCreate={clientCreate}
          setClientCreate={setClientCreate}
          clientUpdate={clientUpdate}
          setClientUpdate={setClientUpdate}
          clientView={clientView}
          setClientView={setClientView}
          saleCreate={saleCreate}
          setSaleCreate={setSaleCreate}
          saleUpdate={saleUpdate}
          setSaleUpdate={setSaleUpdate}
          saleView={saleView}
          setSaleView={setSaleView}
          creditCreate={creditCreate}
          setCreditCreate={setCreditCreate}
          creditUpdate={creditUpdate}
          setCreditUpdate={setCreditUpdate}
          creditView={creditView}
          setCreditView={setCreditView}
          userCreate={userCreate}
          setUserCreate={setUserCreate}
          userUpdate={userUpdate}
          setUserUpdate={setUserUpdate}
          userView={userView}
          setUserView={setUserView}
          expenseCreate={expenseCreate}
          setExpenseCreate={setExpenseCreate}
          expenseUpdate={expenseUpdate}
          setExpenseUpdate={setExpenseUpdate}
          expenseView={expenseView}
          setExpenseView={setExpenseView}
        />
      )}
      {addUser && (
        <AddUser
          token={token}
          setLoading={setLoading}
          addUser={addUser}
          setAddUser={setAddUser}
          changed={changed}
          setChanged={setChanged}
          setEditUser={setEditUser}
          getItemData={getItemData}
        />
      )}
      <div className="main_right-head">
        <h3>O'zgartirish uchun qalamchani tanlang</h3>
        <button
          className="client_add"
          onClick={() => {
            setAddUser(true);
          }}
        >
          FOYDALANUVCHI QO'SHISH
          <TiPlus />
        </button>
      </div>
      <div className="client_search">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FaSearch />
          <input type="text" placeholder="Qidiruv..." />
        </form>
      </div>

      <div className="adminOrWorker">
        <span>Ishchilar</span>
        <Switch
          {...label}
          onClick={toggleDidHanSoloShootFirst}
          defaultChecked
          color="default"
        />{" "}
        <span>Adminlar</span>
      </div>

      <table className="client_table">
        <thead>
          <tr>
            <th>№</th>
            <th>Username</th>
            <th>Ism</th>
            <th>Familiya</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {user?.results?.slice(0, 25).map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.role == "worker" ? "Ishchi" : "Admin"}</td>
                <td className="editClient_btn">
                  <FaEdit
                    onClick={() => {
                      setEditUser(true);
                      getItemData(item.id);
                      setItemId(item.id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default User;
