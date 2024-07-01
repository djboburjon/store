import React, { useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { FaEdit, FaSearch } from "react-icons/fa";
import AddProduct from "../addProduct/AddProduct";
import EditProduct from "../editProduct/EditProduct";
import { Switch } from "@mui/material";

function Products({ token, setLoading }) {
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState(false);
  const [changed, setChanged] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPrchPrice, setEditPrchPrice] = useState("");
  const [editPrecent, setEditPrecent] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCount, setEditCount] = useState("");
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

    fetch(
      `https://telzone.pythonanywhere.com/product/all/?status=${prodType}`,
      requestOptions
    )
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
      `https://telzone.pythonanywhere.com/product/all/?search=${e.target.value}&status=${prodType}`,
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

    fetch(
      `https://telzone.pythonanywhere.com/product/?pk=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEditName(result.name);
        setEditPrchPrice(result.purchase_price);
        setEditPrecent(result.percent);
        setEditPrice(result.price);
        setEditCount(result.count);
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
      `https://telzone.pythonanywhere.com/product/all/?limit=25&offset=25&status=${prodType}`,
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

    fetch(
      `https://telzone.pythonanywhere.com/product/all/?limit=25&status=${prodType}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      {addProduct && (
        <AddProduct
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
          editCount={editCount}
          setEditCount={setEditCount}
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
      <div className="client_search">
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
            <th>Olingan Narx</th>
            <th>Foiz</th>
            <th>Sotish Narxi</th>
            <th>Soni</th>
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
                <td>{item.purchase_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                <td>
                  {Number.isInteger(item.percent)
                    ? item.percent
                    : item.percent.toFixed(2)}
                </td>
                <td>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                <td>{item.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
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
