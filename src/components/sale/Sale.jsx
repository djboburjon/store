import React, { useEffect, useState } from "react";
import "./Sale.css";
import { FaEdit, FaSearch, FaTimes } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import AddSale from "../addSale/AddSale";
import EditSale from "../editSale/EditSale";
import { MdDelete } from "react-icons/md";
import DownloadSale from "../downloadSale/DownloadSale";

function Sale({ baseUrl, token, setLoading }) {
  const [sales, setSales] = useState([]);
  const [addSale, setAddSale] = useState(false);
  const [changed, setChanged] = useState(false);
  const [editSale, setEditSale] = useState(false);
  const [editProductName, setEditProductName] = useState("");
  const [editClientName, setEditClientName] = useState("");
  const [editCreditName, setEditCreditName] = useState("");
  const [editSoldPrice, setEditSoldPrice] = useState("");
  const [editDiscountPrice, setEditDiscountPrice] = useState("");
  const [editInfo, setEditInfo] = useState("");
  const [itemId, setItemId] = useState("0");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userAll, setUserAll] = useState([]);
  const [onUser, setOnUser] = useState("");
  const [download, setDownload] = useState(false);

  const getSale = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}sale/all/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSales(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Nimadir xato");
      });
  };

  const searchSale = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}sale/all/?search=${e.target.value}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setSales(result))
      .catch((error) => console.error(error));
  };

  const userSelect = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}user/select/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUserAll(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setLoading(true);
    getSale();
    userSelect();
  }, [token, changed]);

  const getItemData = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}sale/?pk=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEditProductName(result.product);
        setEditClientName(result.client);
        setEditCreditName(result.credit_base);
        setEditSoldPrice(result.sold_price);
        setEditDiscountPrice(result.discount);
        setEditInfo(result.info);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Nimadir xato");
      });
  };

  const nextData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}ll/?limit=25&offset=25`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSales(result);
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

    fetch(`${baseUrl}ll/?limit=25`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSales(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const dateData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    if (onUser.length === 0) {
      fetch(
        `${baseUrl}sale/all/?from_date=${fromDate}&to_date=${toDate}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setSales(result);
          setLoading(false);
        })
        .catch((error) => {
          alert("Nimadir xato");
          console.error(error);
        });
    } else {
      fetch(
        `${baseUrl}sale/all/?from_date=${fromDate}&to_date=${toDate}&user=${onUser}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setSales(result);
          setLoading(false);
        })
        .catch((error) => {
          alert("Nimadir xato");
          console.error(error);
        });
    }
  };

  const deleteData = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}sale/delete/?pk=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setChanged(!changed);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {addSale && (
        <AddSale
          baseUrl={baseUrl}
          token={token}
          setLoading={setLoading}
          addSale={addSale}
          setAddSale={setAddSale}
          changed={changed}
          setChanged={setChanged}
        />
      )}
      {editSale && (
        <EditSale
          baseUrl={baseUrl}
          token={token}
          setLoading={setLoading}
          changed={changed}
          setChanged={setChanged}
          editSale={editSale}
          setEditSale={setEditSale}
          editProductName={editProductName}
          setEditProductName={setEditProductName}
          editClientName={editClientName}
          setEditClientName={setEditClientName}
          editCreditName={editCreditName}
          setEditCreditName={setEditCreditName}
          editSoldPrice={editSoldPrice}
          setEditSoldPrice={setEditSoldPrice}
          editDiscountPrice={editDiscountPrice}
          setEditDiscountPrice={setEditDiscountPrice}
          editInfo={editInfo}
          setEditInfo={setEditInfo}
          itemId={itemId}
        />
      )}

      {download && (
        <DownloadSale
          baseUrl={baseUrl}
          token={token}
          setDownload={setDownload}
          setLoading={setLoading}
        />
      )}

      <div className="main_right-head">
        <h3>O'zgartirish uchun qalamchani tanlang</h3>
        <button
          className="client_add"
          onClick={() => {
            setAddSale(true);
          }}
        >
          SOTUV QO'SHISH
          <TiPlus />
        </button>
      </div>
      <div className="client_search">
        <form
          className="form0"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            searchSale();
          }}
        >
          <FaSearch />
          <input type="text" onChange={searchSale} placeholder="Qidiruv..." />
        </form>
        <form
          className="form1"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            dateData();
          }}
        >
          <input
            type="date"
            onChange={(e) => {
              setFromDate(e.target.value);
            }}
          />
          <input
            type="date"
            onChange={(e) => {
              setToDate(e.target.value);
            }}
          />
          <select
            onChange={(e) => {
              setOnUser(e.target.value);
            }}
          >
            <option value="">-----</option>
            {userAll?.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.username}
                </option>
              );
            })}
          </select>
          <button>Filtrlash</button>
          <div
            className="downloadBtn"
            onClick={() => {
              setDownload(true);
            }}
          >
            Yuklash
          </div>
        </form>
      </div>
      <table className="client_table sale_table">
        <thead>
          <tr>
            <th>№</th>
            <th>Mahsulot</th>
            <th>Imei</th>
            <th>Mijoz</th>
            <th>Nasiya Baza</th>
            <th>Olingan Narx</th>
            <th>Sotilgan Narx</th>
            <th>Chegirma</th>
            <th>Sotuvchi</th>
          </tr>
        </thead>
        <tbody>
          {sales?.results?.slice(0, 25).map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {item.product.map((meti, index) => {
                    return <span key={index}>{meti.name}, </span>;
                  })}
                </td>
                <td>
                  {item.product.map((meti, index) => {
                    return <span key={index}>{meti.imei}, </span>;
                  })}
                </td>
                <td>
                  {item.client.FIO}-{item.client.phone_number}
                </td>
                <td>
                  {item.credit_base.map((meti, index) => {
                    return <span key={index}>{meti.name}, </span>;
                  })}
                </td>
                <td>
                  {item.bought_price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </td>
                <td>
                  {item.sold_price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </td>
                <td>
                  {item.discount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </td>
                <td>{item.sold_user?.username}</td>
                <td className="editClient_btn">
                  <FaEdit
                    onClick={() => {
                      setLoading(true);
                      setEditSale(true);
                      getItemData(item.id);
                      setItemId(item.id);
                    }}
                  />
                </td>
                <td className="deleteClient_btn">
                  <MdDelete
                    onClick={() => {
                      if (confirm("Sotuv o'chiriladi!")) {
                        deleteData(item.id);
                      }
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="client_count">{sales?.count} ta mijoz</div>

      <div className="paginations">
        <div className="prev">
          {sales.previous ? (
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
          {sales.next ? (
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

export default Sale;
