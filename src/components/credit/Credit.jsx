import React, { useEffect, useState } from "react";
import "./Credit.css";
import { TiPlus } from "react-icons/ti";
import { FaEdit, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddCredit from "../addCredit/AddCredit";

function Credit({ token }) {
  const [credits, setCredits] = useState([]);
  const [addCredit, setAddCredit] = useState(false);
  const [changed, setChanged] = useState(false);

  const getCredit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/credit_base/all/", requestOptions)
      .then((response) => response.json())
      .then((result) => setCredits(result))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getCredit();
  }, [token, changed]);
  return (
    <div className="creditSection">
      <div className="container">
        <div className="main_left">
          <Link to={"/client/all"}>
            <div className="clients box_link">Mijozlar</div>
          </Link>

          <Link to={"/credit/all"}>
            <div className="credit box_link">Credit baza</div>
          </Link>

          <Link to={"/product/all"}>
            <div className="products box_link">Mahsulotlar</div>
          </Link>

          <Link to={"/"}>
            <div className="sales box_link">Chegirmalar</div>
          </Link>

          <Link to={"/"}>
            <div className="users box_link">Foydalanuvchilar</div>
          </Link>
        </div>
        <div className="main_right">
          {addCredit && (
            <AddCredit
              token={token}
              addCredit={addCredit}
              setAddCredit={setAddCredit}
              changed={changed}
              setChanged={setChanged}
            />  
          )}
          <div className="main_right-head">
            <h3>O'zgartirish uchun qalamchani tanlang</h3>
            <button className="client_add" onClick={()=>{
              setAddCredit(true)
            }}>
              NASIYA QO'SHISH
              <TiPlus />
            </button>
          </div>
          <div className="client_search">
            <form action="">
              <FaSearch />
              <input type="text" placeholder="Qidiruv..." />
            </form>
          </div>
          <table className="client_table">
            <thead>
              <tr>
                <th>№</th>
                <th>Nomi</th>
              </tr>
            </thead>
            <tbody>
              {credits?.results?.slice(0, 25).map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td className="editClient_btn">
                      <FaEdit/>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="client_count">{credits?.count} ta mijoz</div>

          <div className="paginations">
            <div className="prev">
              <button className="disabled_btn" disabled>
                Ortga
              </button>
            </div>
            <div className="next">
              <button className="disabled_btn" disabled>
                Keyingi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credit;
