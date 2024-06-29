import React, { useEffect, useState } from "react";
import "./Expenses.css";
import { TiPlus } from "react-icons/ti";
import { FaEdit, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import EditExpense from "../editExpenses/EditExpense";
import AddExpense from "../addExpenses/AddExpense";

function Expenses({ token, setLoading }) {
  const [expenses, setExpenses] = useState([]);
  const [addExpense, setAddExpense] = useState(false);
  const [changed, setChanged] = useState(false);
  const [editExpense, setEditExpense] = useState(false);
  const [editType, setEditType] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [itemId, setItemId] = useState(0);

  const getExpense = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/expense/all/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setExpenses(result);
      })
      .catch((error) => console.error(error));
  };

  const getSearchExpense = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/expense/all/?search=${e.target.value}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setExpenses(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getExpense();
  }, [token, changed]);

  const getItemData = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/expense/?pk=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEditType(result.type);
        setEditPrice(result.price);
      })
      .catch((error) => {
        console.error(error);
        alert("Nimadir xato");
      });
  };
  return (
    <>
      {addExpense && (
        <AddExpense
          token={token}
          setLoading={setLoading}
          addExpense={addExpense}
          setAddExpense={setAddExpense}
          changed={changed}
          setChanged={setChanged}
        />
      )}
      {editExpense && (
        <EditExpense
          token={token}
          setLoading={setLoading}
          changed={changed}
          setChanged={setChanged}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
          editType={editType}
          setEditType={setEditType}
          editPrice={editPrice}
          setEditPrice={setEditPrice}
          itemId={itemId}
          setItemId={setItemId}
        />
      )}
      <div className="main_right-head">
        <h3>O'zgartirish uchun qalamchani tanlang</h3>
        <button
          className="client_add"
          onClick={() => {
            setAddExpense(true);
          }}
        >
          CHIQIM QO'SHISH
          <TiPlus />
        </button>
      </div>
      <div className="client_search">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            getSearchExpense();
          }}
        >
          <FaSearch />
          <input
            onChange={getSearchExpense}
            type="text"
            placeholder="Qidiruv..."
          />
        </form>
      </div>
      <table className="client_table">
        <thead>
          <tr>
            <th>№</th>
            <th>Turi</th>
            <th>Narxi</th>
            <th>Sana</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.results?.slice(0, 25).map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.type}</td>
                <td>
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </td>
                <td>{item.date}</td>
                <td className="editClient_btn">
                  <FaEdit
                    onClick={() => {
                      setEditExpense(true);
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
      <div className="client_count">{expenses?.count} ta xarajat</div>

      <div className="paginations">
        <div className="prev">
          {expenses.previous ? (
            <button
              onClick={() => {
                prevData();
              }}
            >
              Ortga
            </button>
          ) : (
            <button className="disabled_btn" disabled>
              Ortga
            </button>
          )}
        </div>
        <div className="next">
          {expenses.next ? (
            <button
              onClick={() => {
                nextData();
              }}
            >
              Keyingi
            </button>
          ) : (
            <button className="disabled_btn" disabled>
              Keyingi
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Expenses;
