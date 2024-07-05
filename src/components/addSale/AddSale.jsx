import React, { useEffect, useState } from "react";
import "./AddSale.css";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function AddSale({
  baseUrl,
  token,
  setLoading,
  addSale,
  setAddSale,
  changed,
  setChanged,
}) {
  const [prodName, setProdName] = useState([]);
  const [client, setClient] = useState("");
  const [creditBaze, setCreditBaze] = useState([]);
  const [info, setInfo] = useState("");
  const [products, setProducts] = useState([]);
  const [newClient, setNewClient] = useState([]);
  const [credits, setCredits] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0)
  const [selected, setselected] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);

  const getProduct = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}product/all/?status=on_sale`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
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

    fetch(`${baseUrl}client/all/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setNewClient(result);
        setLoading(false);
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

    fetch(`${baseUrl}credit_base/all/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCredits(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };
  const createSale = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const raw = JSON.stringify({
      product: selected?.map((item) => {
        return item.id;
      }),
      client: selectedClient.id,
      sold_price: (totalPrice - discountPrice),
      credit_base: creditBaze?.map((item) => {
        return item.id;
      }),
      discount: discountPrice,
      info: info,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}sale/create/`, requestOptions)
      .then((response) => {
        response.json();
        if (response.status === 200) {
          setAddSale(false);
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
    toast.success("Ma'lumot qo'shildi!", {
      position: "top-right",
      autoClose: 2000,
    });
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

  useEffect(() => {
    var summ = 0;
    selected.forEach((item) => {
      summ += item.price;
      setTotalPrice(summ);
    });
  }, [selected]);

  return (
    <div className="addSale">
      <div
        className="exit_btn"
        onClick={() => {
          setAddSale(false);
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
            setLoading(true);
            createSale();
          }}
        >
          <div>
            <h3>Mahsulot Nomi</h3>
            <Select
              onChange={(e) => {
                setTotalPrice(0);
                setselected(e);
              }}
              isMulti
              name="products"
              options={productOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            <h3>Mijoz</h3>
            <Select
              isMulti
              onChange={(e) => {
                setSelectedClient(e[e.length - 1]);
              }}
              value={selectedClient}
              name="clients"
              options={clientOptions}
              className="basic-multi-select clientSelect"
              classNamePrefix="select"
            />
            <h3>Nasiya Baza</h3>
            <Select
              isMulti
              name="credits"
              options={creditOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => {
                setCreditBaze(e);
              }}
            />
          </div>
          <div>
            <h3>Narxi</h3>
            <input
              name="priceName"
              onChange={(e) => {
                setTotalPrice(e.target.value);
              }}
              value={totalPrice}
              type="number"
              placeholder="Mahsulot Narxi"
            />
            <h3>Chegirma narxi</h3>
            <input
              name="discountName"
              onChange={(e) => {
                setDiscountPrice(e.target.value);
              }}
              type="number"
              placeholder="Chegirma"
            />
            <h3>Izoh</h3>
            <textarea
              className="addSaleInfo"
              rows={6}
              onChange={(e) => {
                setInfo(e.target.value);
              }}
              type="textarea"
              placeholder="Izohingizni kiriting..."
            />
            <button>Qo'shish</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSale;
