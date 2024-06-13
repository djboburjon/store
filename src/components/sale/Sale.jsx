import React, { useEffect, useState } from "react";
import "./Sale.css";
import { FaEdit, FaSearch } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import AddSale from "../addSale/AddSale";
import EditSale from "../editSale/EditSale";

function Sale({ token }) {
  const [sales, setSales] = useState([]);
  const [addSale, setAddSale] = useState(false);
  const [changed, setChanged] = useState(false);
  const [editSale, setEditSale] = useState(false);
  const [editProductName, setEditProductName] = useState("");
  const [editClientName, setEditClientName] = useState("");
  const [editCreditName, setEditCreditName] = useState("");
  const [editSoldPrice, setEditSoldPrice] = useState("");
  const [editInfo, setEditInfo] = useState("");
  const [itemId, setItemId] = useState("0");

  const getSale = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/sale/all/", requestOptions)
      .then((response) => response.json())
      .then((result) => setSales(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getSale();
  }, [token, changed]);

  const getItemData = (id) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://telzone.pythonanywhere.com/sale/?pk=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEditProductName(result.product)
        setEditClientName(result.client)
        setEditCreditName(result.credit_base)
        setEditSoldPrice(result.sold_price)
        setEditInfo(result.info)
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="saleSection">
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

          <Link to={"/sale/all"}>
            <div className="sales box_link">Chegirmalar</div>
          </Link>

          <Link to={"/"}>
            <div className="users box_link">Foydalanuvchilar</div>
          </Link>
        </div>
        <div className="main_right">
          {addSale && (
            <AddSale
              token={token}
              addSale={addSale}
              setAddSale={setAddSale}
              changed={changed}
              setChanged={setChanged}
            />
          )}
          {editSale && (
            <EditSale
              token={token}
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
              editInfo={editInfo}
              setEditInfo={setEditInfo}
              itemId={itemId}
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
              CHEGIRMA QO'SHISH
              <TiPlus />
            </button>
          </div>
          {/* <div className="client_search">
            <form action="">
              <FaSearch />
              <input type="text" placeholder="Qidiruv..." />
            </form>
          </div> */}
          <table className="client_table">
            <thead>
              <tr>
                <th>№</th>
                <th>Mahsulot</th>
                <th>Mijoz</th>
                <th>Nasiya Baza</th>
                <th>Narxi</th>
                <th>Sanasi</th>
              </tr>
            </thead>
            <tbody>
              {sales?.results?.slice(0, 25).map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {item.product.map((meti) => {
                        return <span>{meti.name}, </span>;
                      })}
                    </td>
                    <td>
                      {item.client.FIO}-{item.client.phone_number}
                    </td>
                    <td>
                      {item.credit_base.map((meti) => {
                        return <span>{meti.name}, </span>;
                      })}
                    </td>
                    <td>{item.sold_price}</td>
                    <td>{item.date}</td>
                    <td className="editClient_btn">
                      <FaEdit
                        onClick={() => {
                          setEditSale(true);
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
          <div className="client_count">{sales?.count} ta mijoz</div>

          <div className="paginations">
            <div className="prev">
              {sales.previous ? (
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
              {sales.next ? (
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
        </div>
      </div>
    </div>
  );
}

export default Sale;
