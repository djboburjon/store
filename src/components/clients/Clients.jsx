import React, { useEffect, useState } from "react";
import "./Clients.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { TiPlus } from "react-icons/ti";
import { FaEdit, FaSearch } from "react-icons/fa";
import EditClients from "../editClients/EditClients";
import AddClients from "../addClients/AddClients";
function Clients({baseUrl, token, setLoading }) {
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [newClient, setNewClient] = useState([]);
  const [editClient, setEditClient] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [addClient, setAddClient] = useState(false);
  const [changed, setChanged] = useState(false);

  const getClient = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/client/all/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setNewClient(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const getSearchClient = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}client/all/?search=${e.target.value}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setNewClient(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setLoading(true);
    getClient();
  }, [token, changed]);

  const getItemData = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}client/?pk=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEditName(result.FIO);
        setEditNumber(result.phone_number);
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
      `${baseUrl}client/all/?limit=25&offset=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setNewClient(result);
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
      `${baseUrl}client/all/?limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setNewClient(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const formatNumber = (number) => {
    const str = number.toString();
    return `${str.slice(0, 2)} ${str.slice(2, 5)} ${str.slice(5, 7)} ${str.slice(7)}`;
  };

  return (
    <>
      {addClient && (
        <AddClients
          baseUrl={baseUrl}
          token={token}
          setLoading={setLoading}
          setNewClient={setNewClient}
          addClient={addClient}
          setAddClient={setAddClient}
          changed={changed}
          setChanged={setChanged}
        />
      )}
      {editClient && (
        <EditClients
          baseUrl={baseUrl}
          token={token}
          setLoading={setLoading}
          editClient={editClient}
          setEditClient={setEditClient}
          editName={editName}
          editNumber={editNumber}
          setEditName={setEditName}
          setEditNumber={setEditNumber}
          itemId={itemId}
          setNewClient={setNewClient}
          changed={changed}
          setChanged={setChanged}
        />
      )}
      <div className="main_right-head">
        <h3>O'zgartirish uchun qalamchani tanlang</h3>
        <button
          className="client_add"
          onClick={() => {
            setAddClient(true);
          }}
        >
          MIJOZ QO'SHISH
          <TiPlus />
        </button>
      </div>
      <div className="client_search">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            getSearchClient();
          }}
        >
          <FaSearch />
          <input
            type="text"
            onChange={getSearchClient}
            placeholder="Qidiruv..."
          />
          {/* <button>Qidiruv</button> */}
        </form>
      </div>

      <table className="client_table">
        <thead>
          <tr>
            <th>№</th>
            <th>F.I.Sh</th>
            <th>Telefon Raqam</th>
          </tr>
        </thead>
        <tbody>
          {newClient?.results?.slice(0, 25).map((item, index) => {
            const formattedNumber = formatNumber(item.phone_number);

            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.FIO}</td>
                <td>{formattedNumber}</td>
                <td className="editClient_btn">
                  <FaEdit
                    onClick={() => {
                      setLoading(true);
                      setEditClient(true);
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
      <div className="client_count">{newClient?.count} ta mijoz</div>

      <div className="paginations">
        <div className="prev">
          {newClient.previous ? (
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
          {newClient.next ? (
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

export default Clients;
