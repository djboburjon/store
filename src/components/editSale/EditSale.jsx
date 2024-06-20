import React, { useEffect, useState } from "react";
import "./EditSale.css";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function EditSale({
  token,
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
  var oldNames;
  if (editProductName) {
    oldNames = editProductName?.map((item) => {
      return { label: item.name };
    });
  } else {
    oldNames = [];
  }
  var oldClient = [
    {
      label: editClientName?.FIO,
    },
  ];
  var oldCredit;
  if (editCreditName) {
    oldCredit = editCreditName?.map((item) => {
      return { label: item.name };
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

  const editSaleData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

    const raw = JSON.stringify({
      product: editProductName?.map((item) => {
        return item.id;
      }),
      client: selectedClient.id,
      sold_price: totalPrice,
      credit_base: creditBaze?.map((item) => {
        return item.id;
      }),
      info: info,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://telzone.pythonanywhere.com/sale/update/?pk=2",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };
  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri tahrirlang!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  useEffect(() => {
    getProduct();
    getClient();
    getCredit();
  }, [token]);

  // useEffect(() => {
  //   var summ = 0;
  //   selected.forEach((item) => {
  //     summ += item.price;
  //     setTotalPrice(summ);
  //   });
  // }, [selected]);
  return (
    <div className="editSale">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setEditSale(false);
        }}
      >
        <FaTimes />
      </div>
      <div className="container">
        <form
          className="form"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            editSaleData();
          }}
        >
          <div>
            <h3>Mahsulot Nomi</h3>
            <Select
              onChange={(e) => {
                setTotalPrice(0);
                // setselected(e);
                // setEditProductName(e)
              }}
              isMulti
              name="products"
              options={productOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={oldNames}
            />
            <h3>Mijoz</h3>
            <Select
              onChange={(e) => {
                setSelectedClient(e[e.length - 1]);
              }}
              isMulti
              name="clients"
              options={clientOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={oldClient}
            />
            <h3>Nasiya Baza</h3>
            <Select
              onChange={(e) => {
                setCreditBaze(e);
              }}
              isMulti
              name="credits"
              options={creditOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={oldCredit}
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
  );
}

export default EditSale;
