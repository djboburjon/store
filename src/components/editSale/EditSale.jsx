import React, { useEffect, useState } from "react";
import "./EditSale.css";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function EditSale({
  token,
  setLoading,
  changed,
  setChanged,
  editSale,
  setEditSale,
  editProductName,
  setEditProductName,
  editClientName,
  setEditClientName,
  editCreditName,
  setEditCreditName,
  editSoldPrice,
  setEditSoldPrice,
  editInfo,
  setEditInfo,
  itemId,
}) {
  const [products, setProducts] = useState([]);
  const [newClient, setNewClient] = useState([]);
  const [credits, setCredits] = useState([]);
  const [selected, setselected] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [creditBaze, setCreditBaze] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [editedNames, setEditedname] = useState(null);

  var oldNames;
  if (editProductName) {
    oldNames = editProductName?.map((item) => {
      return {
        label: item.name,
        value: item.name,
        price: item.price,
        id: item.id,
      };
    });
  } else {
    oldNames = [];
  }

  var oldCredit;
  if (editCreditName) {
    oldCredit = editCreditName?.map((item) => {
      return {
        label: item.name,
        value: item.name,
        price: item.price,
        id: item.id,
      };
    });
  } else {
    oldCredit = [];
  }

  const getProduct = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://telzone.pythonanywhere.com/product/all/?status=on_sale",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.error(error));
  };

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
        setNewClient(result);
      })
      .catch((error) => console.error(error));
  };

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

  const trans = (products) => {
    return products?.results?.map((item) => ({
      value: item.name.toLowerCase().replace(/\s/g, "-"),
      label: item.name,
      price: item.price,
      id: item.id,
    }));
  };
  const transformDataToOptions = (products) => {
    return products?.results?.map((item) => ({
      value: item.name.toLowerCase().replace(/\s/g, "-"),
      label: item.name,
      id: item.id,
    }));
  };
  const transformDataToOptions1 = (newClient) => {
    return newClient?.results?.map((item) => ({
      value: `${item.FIO.toLowerCase().replace(/\s/g, "-")}-${
        item.phone_number
      }`,
      label: `${item.FIO}-${item.phone_number}`,
      id: item.id,
    }));
  };

  const productOptions = trans(products);
  const clientOptions = transformDataToOptions1(newClient);
  const creditOptions = transformDataToOptions(credits);

  useEffect(() => {
    getProduct();
    getClient();
    getCredit();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      product: editProductName.map((item) => {
        return item.id;
      }),
      client: editClientName.id,
      sold_price: editSoldPrice,
      credit_base: editCreditName.map((item) => {
        return item.id;
      }),
      info: editInfo,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/sale/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => {
        response.json();
        if (response.status === 200) {
          setEditSale(false);
          setChanged(!changed);
          setLoading(false);
          notifySuccess();
        } else if (response.status === 403) {
          setLoading(false);
          notify("Sizga ruxsat etilmagan");
        } else {
          setLoading(false);
          notify("Ma'lumotlarni to'g'ri kiriting");
        }
      })
      .then((result) => {})
      .catch((error) => {
        setLoading(false);
        notify("Nimadir xato");
        console.error(error);
      });
  };

  const notify = (text) => {
    toast.warning(text, {
      position: "top-right",
      autoClose: 3000,
    });
  };
  const notifySuccess = () => {
    toast.success("Ma'lumot tahrirlandi!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <>
      {editProductName ? (
        <div className="editSale">
          <div
            className="exit_btn"
            onClick={() => {
              setEditSale(false);
            }}
          >
            <FaTimes />
          </div>
          <div className="container">
            <form className="form" action="" onSubmit={handleSubmit}>
              <div>
                <h3>Mahsulot Nomi</h3>
                <Select
                  onChange={(e) => {
                    setTotalPrice(0);
                    setEditProductName(e);

                    var price = 0;
                    e.forEach((item) => {
                      price += item.price;
                    });
                    setEditSoldPrice(price);
                  }}
                  isMulti
                  name="products"
                  options={productOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  defaultValue={oldNames}
                />
                <h3>Mijoz</h3>
                <Select
                  onChange={(e) => {
                    setEditClientName({
                      FIO: e[e.length - 1].value,
                    });
                  }}
                  isMulti
                  name="clients"
                  options={clientOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={[
                    {
                      label: editClientName?.FIO,
                    },
                  ]}
                />
                <h3>Nasiya Baza</h3>
                <Select
                  onChange={(e) => {
                    setCreditBaze(e);
                    setEditCreditName(e);
                  }}
                  isMulti
                  name="credits"
                  options={creditOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  defaultValue={oldCredit}
                />
              </div>
              <div>
                <h3>Narxi</h3>
                <input
                  value={editSoldPrice}
                  name="priceName"
                  onChange={(e) => {
                    setEditSoldPrice(e.target.value);
                  }}
                  type="number"
                  placeholder="Mahsulot Narxi"
                />
                <h3>Izoh</h3>
                <textarea
                  value={editInfo}
                  className="addSaleInfo"
                  rows={6}
                  onChange={(e) => {
                    setEditInfo(e.target.value);
                  }}
                  type="textarea"
                  placeholder="Izohingizni kiriting..."
                />
                <button>Tahrirlash</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default EditSale;
