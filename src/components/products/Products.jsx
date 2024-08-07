import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { FaEdit, FaSearch } from "react-icons/fa";
import AddProduct from "../addProduct/AddProduct";
import EditProduct from "../editProduct/EditProduct";
import { Switch } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function Products({ baseUrl, token, setLoading }) {
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState(false);
  const [changed, setChanged] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPrchPrice, setEditPrchPrice] = useState("");
  const [editPrecent, setEditPrecent] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImei, setEditImei] = useState("");
  const [itemId, setItemId] = useState(0);
  const [prodType, setProdType] = useState("on_sale");
  const [didHanSoloShootFirst, setDidHanSoloShootFirst] = useState(true);

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  const getProduct = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}product/all/?status=${prodType}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const searchProduct = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}product/all/?search=${e.target.value}&status=${prodType}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.error(error));
  };

  function toggleDidHanSoloShootFirst() {
    if (didHanSoloShootFirst === true) {
      setDidHanSoloShootFirst(false);
      setProdType("sold");
      setChanged(!changed);
    } else if (didHanSoloShootFirst === false) {
      setDidHanSoloShootFirst(true);
      setProdType("on_sale");
      setChanged(!changed);
    }
  }

  useEffect(() => {
    setLoading(true);
    getProduct();
  }, [token, changed]);

  const getItemData = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}product/?pk=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEditName(result.name);
        setEditPrchPrice(result.purchase_price);
        setEditPrecent(result.percent);
        setEditPrice(result.price);
        setEditImei(result.imei);
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

    fetch(
      `${baseUrl}product/all/?limit=25&offset=25&status=${prodType}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
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

    fetch(`${baseUrl}product/all/?limit=25&status=${prodType}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const downloadFile = async (userId) => {
    try {
      const response = await axios({
        url: `${baseUrl}product/export/`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "downloaded_file.xlsx");
    } catch (error) {
      console.error("Error exporting sales to Excel:", error);
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

    fetch(`${baseUrl}product/delete/?pk=${id}`, requestOptions)
      .then((response) => {
        response.json();
        if (response.status === 200) {
          setChanged(!changed);
          notifySuccess("Mijoz o'chirildi");
        } else if (response.status === 403) {
          notify("Sizga ruxsat etilmagan");
        } else {
          notify("Nimadir xato");
        }
      })
      .then((result) => {})
      .catch((error) => {
        console.error(error);
        notify("Nimadir xato");
      });
  };

  const notify = (text) => {
    toast.warning(text, {
      position: "top-right",
      autoClose: 3000,
    });
  };
  const notifySuccess = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 2000,
    });
  };
  return (
    <>
      {addProduct && (
        <AddProduct
          baseUrl={baseUrl}
          token={token}
          setLoading={setLoading}
          addProduct={addProduct}
          setAddProduct={setAddProduct}
          changed={changed}
          setChanged={setChanged}
        />
      )}
      {editProduct && (
        <EditProduct
          baseUrl={baseUrl}
          token={token}
          setLoading={setLoading}
          changed={changed}
          setChanged={setChanged}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          editName={editName}
          setEditName={setEditName}
          editPrchPrice={editPrchPrice}
          setEditPrchPrice={setEditPrchPrice}
          editPrecent={editPrecent}
          setEditPrecent={setEditPrecent}
          editPrice={editPrice}
          setEditPrice={setEditPrice}
          editImei={editImei}
          setEditImei={setEditImei}
          itemId={itemId}
        />
      )}
      <div className="main_right-head">
        <h3>O'zgartirish uchun qalamchani tanlang</h3>
        <button
          className="client_add"
          onClick={() => {
            setAddProduct(true);
          }}
        >
          MAHSULOT QO'SHISH
          <TiPlus />
        </button>
      </div>
      <div className="client_search productSearch">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            searchProduct();
          }}
        >
          <FaSearch />
          <input
            type="text"
            onChange={searchProduct}
            placeholder="Qidiruv..."
          />
        </form>
        <div className="downloadBtn" onClick={downloadFile}>
          Yuklash
        </div>
      </div>

      <div className="adminOrWorker">
        <span>Sotilganlar</span>
        <Switch
          {...label}
          onClick={toggleDidHanSoloShootFirst}
          defaultChecked
          color="default"
        />{" "}
        <span>Sotuvdagilar</span>
      </div>

      <table className="client_table product_table">
        <thead>
          <tr>
            <th>№</th>
            <th>Nomi</th>
            <th>Imei</th>
            <th>Olingan Narx</th>
            <th>Foiz</th>
            <th>Sotish Narxi</th>
            <th>Sana</th>
            <th>Holati</th>
          </tr>
        </thead>
        <tbody>
          {products?.results?.slice(0, 25).map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.imei}</td>
                <td>
                  {item.purchase_price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </td>
                <td>
                  {Number.isInteger(item.percent)
                    ? item.percent
                    : item.percent.toFixed(2)}
                </td>
                <td>
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </td>
                <td className="productDate">{item.date}</td>
                <td>{item.status == "on_sale" ? "Sotuvda" : "Sotilgan"}</td>
                <td className="editClient_btn">
                  <FaEdit
                    onClick={() => {
                      setLoading(true);
                      setEditProduct(true);
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
      <div className="client_count">{products?.count} ta mahsulot</div>

      <div className="paginations">
        <div className="prev">
          {products.previous ? (
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
          {products.next ? (
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

export default Products;
