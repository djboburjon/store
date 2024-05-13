import React, { useEffect, useState } from "react";
import "./Clients.css";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { FaEdit, FaSearch } from "react-icons/fa";
import EditClients from "../editClients/EditClients";
import AddClients from "../addClients/AddClients";
function Clients({ token }) {
  const [editName, setEditName] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [newClient, setNewClient] = useState([]);
  const [editClient, setEditClient] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [addClient, setAddClient] = useState(false);

  const getClient = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/client/all/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setNewClient(result)
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
      `https://telzone.pythonanywhere.com/client/all/?search=${e.target.value}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setNewClient(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getClient();
  }, [token]);

  const getItemData = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://telzone.pythonanywhere.com/client/?pk=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEditName(result.FIO);
        setEditNumber(result.phone_number);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="clientSection">
      <div className="container">
        <div className="main_left">
          <div className="client_box">
            <div className="main_left-head">MIJOZ</div>
            <div className="clients box_link">
              <div>
                <Link to={"/client/all"}>Mijozlar</Link>
              </div>
              <p>
                <TiPlus />
                Qo'sh
              </p>
            </div>
          </div>
          <div className="product_box">
            <div className="main_left-head">MAHSULOT</div>
            <div className="expenses box_link">
              <div>Xarajatlar</div>
              <p>
                <TiPlus />
                Qo'sh
              </p>
            </div>
            <div className="products box_link">
              <div>Mahsulotlar</div>
              <p>
                <TiPlus />
                Qo'sh
              </p>
            </div>
          </div>
          <div className="sale_box">
            <div className="main_left-head">Chegirma</div>
            <div className="sales box_link">
              <div>Chegirmalar</div>
              <p>
                <TiPlus />
                Qo'sh
              </p>
            </div>
          </div>
          <div className="use_box">
            <div className="main_left-head">FOYDALANUVCHI</div>
            <div className="users box_link">
              <div>Foydalanuvchilar</div>
              <p>
                <TiPlus />
                Qo'sh
              </p>
            </div>
          </div>
        </div>
        <div className="main_right">
          {addClient && (
            <AddClients token={token} setNewClient={setNewClient} addClient={addClient} setAddClient={setAddClient} />
          )}
          {editClient && (
            <EditClients
              token={token}
              editClient={editClient}
              setEditClient={setEditClient}
              editName={editName}
              editNumber={editNumber}
              setEditName={setEditName}
              setEditNumber={setEditNumber}
              itemId={itemId}
              setNewClient={setNewClient}
            />
          )}
          <div className="main_right-head">
            <h3>O'zgartirish uchun mijoz tanlang</h3>
            <button
              className="client_add"
              onClick={() => {
                setAddClient(true);
              }}
            >
                MIJOZ QO'SH
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
              <input type="text" onChange={getSearchClient} placeholder="Qidiruv..." />
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
                return (
                  <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.FIO}</td>
                    <td>{item.phone_number}</td>
                    <td className="editClient_btn">
                      <FaEdit
                        onClick={() => {
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
            <div className="prev"><button>Ortga</button></div>
            <div className="next"><button>Keyingi</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
