import React, { useEffect, useState } from "react";
import "./Home.css";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";

function Home({ token }) {
  const [dashData, setDashData] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const getData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://telzone.pythonanywhere.com/dashboard/payment/results/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setDashData(result))
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

    fetch(
      `https://telzone.pythonanywhere.com/dashboard/payment/results/?from_date=${fromDate}&to_date=${toDate}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setDashData(result))
      .catch((error) => console.error(error));
  };

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
  };
  useEffect(() => {
    getData();
  }, [token]);
  return (
    <>
      <div className="main_right-head">
        <h3>Saytimizga xush kelibsiz!</h3>
      </div>
      {dashData && (
        <div className="main_right-info">
          <form
            className="changeDate"
            onSubmit={(e) => {
              e.preventDefault();
              dateData();
            }}
          >
            <div className="dateFrom">
              <p>yil-oy-kun</p>
              <input
                onChange={handleFromDate}
                type="text"
                placeholder="...dan"
              />
            </div>
            <div className="dateTo">
              <p>yil-oy-kun</p>
              <input
                onChange={handleToDate}
                type="text"
                placeholder="...gacha"
              />
            </div>
            <button className="dateBtn">Hisoblash</button>
          </form>
          <div className="right_text">
            <span>{dashData.text}</span>
          </div>
          <div className="saleAndExpense">
            <div className="sale_box">
              <p>Sotuvlar</p>
              <div className="sales">{dashData.sales}</div>
            </div>
            <div className="expense_box">
              <p>Chiqimlar</p>
              <div className="expenses">{dashData.expenses}</div>
            </div>
          </div>
          <div className="warehouse">
            <div className="purchase_box">
              <p>Qoldiq Narx</p>
              <div className="purchasePrice">
                {dashData.warehouse?.purchase_price}
              </div>
            </div>
            <div className="price_box">
              <p>Qoldiq Sotuv Narx</p>
              <div className="price">{dashData.warehouse?.price}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
