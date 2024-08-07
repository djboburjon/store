import React, { useEffect, useState } from "react";
import "./Credit.css";
import { TiPlus } from "react-icons/ti";
import { FaEdit, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddCredit from "../addCredit/AddCredit";
import EditCredit from "../editCredit/EditCredit";

function Credit({baseUrl, token, setLoading }) {
  const [credits, setCredits] = useState([]);
  const [addCredit, setAddCredit] = useState(false);
  const [changed, setChanged] = useState(false);
  const [editCredit, setEditCredit] = useState(false);
  const [editName, setEditName] = useState("");
  const [itemId, setItemId] = useState(0);

  const getCredit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}credit_base/all/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCredits(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const searchCredit = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}credit_base/all/?search=${e.target.value}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setCredits(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setLoading(true);
    getCredit();
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
      `${baseUrl}credit_base/?pk=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEditName(result.name);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const nextData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}credit_base/all/?limit=25&offset=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCredits(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const prevData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}credit_base/all/?limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCredits(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      {addCredit && (
        <AddCredit
          baseUrl={baseUrl}
          token={token}
          setLoading={setLoading}
          addCredit={addCredit}
          setAddCredit={setAddCredit}
          changed={changed}
          setChanged={setChanged}
        />
      )}
      {editCredit && (
        <EditCredit
          baseUrl={baseUrl}
          token={token}
          setLoading={setLoading}
          changed={changed}
          setChanged={setChanged}
          editCredit={editCredit}
          setEditCredit={setEditCredit}
          editName={editName}
          setEditName={setEditName}
          itemId={itemId}
        />
      )}
      <div className="main_right-head">
        <h3>O'zgartirish uchun qalamchani tanlang</h3>
        <button
          className="client_add"
          onClick={() => {
            setAddCredit(true);
          }}
        >
          NASIYA QO'SHISH
          <TiPlus />
        </button>
      </div>
      <div className="client_search">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            searchCredit();
          }}
        >
          <FaSearch />
          <input type="text" onChange={searchCredit} placeholder="Qidiruv..." />
        </form>
      </div>
      <table className="client_table credit_table">
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
                  <FaEdit
                    onClick={() => {
                      setLoading(true);
                      setEditCredit(true);
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
      <div className="client_count">{credits?.count} ta mijoz</div>

      <div className="paginations">
        <div className="prev">
          {credits.previous ? (
            <button
              onClick={() => {
                setLoading(true);
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
          {credits.next ? (
            <button
              onClick={() => {
                setLoading(true);
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

export default Credit;
