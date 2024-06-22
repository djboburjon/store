import React, { useEffect, useState } from "react";
import "./Home.css";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";

function Home({ token }) {
  const [dashData, setDashData] = useState([]);

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
          <div className="changeDate">
            <div className="dateFrom">
              <p>kun-oy-yil</p>
              <input type="number" placeholder="...dan" />
            </div>
            <div className="dateTo">
              <p>kun-oy-yil</p>
              <input type="number" placeholder="...gacha" />
            </div>
          </div>
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
