import React, { useEffect, useState } from "react";
import "./Home.css";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";

function Home({ token, setLoading, menu, setMenu }) {
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
      .then((result) => {
        setDashData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        alert("Nimadir xato");
      });
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
      .then((result) => {
        setDashData(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
  };
  useEffect(() => {
    setLoading(true);
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
              setLoading(true);
              dateData();
            }}
          >
            <div className="dateFrom">
              <p>yil-oy-kun</p>
              <input
                required
                onChange={handleFromDate}
                type="text"
                placeholder="...dan"
              />
            </div>
            <div className="dateTo">
              <p>yil-oy-kun</p>
              <input
                required
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
              <div className="sales">
                {Number.isInteger(dashData?.sales)
                  ? dashData?.sales
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  : dashData?.sales
                      ?.toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </div>
            </div>
            <div className="expense_box">
              <p>Chiqimlar</p>
              <div className="expenses">
                {Number.isInteger(dashData?.expenses)
                  ? dashData?.expenses
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  : dashData?.expenses
                      ?.toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </div>
            </div>
          </div>
          <div className="warehouse">
            <div className="purchase_box">
              <p>Qoldiq Narx</p>
              <div className="purchasePrice">
                {Number.isInteger(dashData.warehouse?.purchase_price)
                  ? dashData.warehouse?.purchase_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  : dashData.warehouse?.purchase_price
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </div>
            </div>
            <div className="price_box">
              <p>Qoldiq Sotuv Narx</p>
              <div className="price">
                {Number.isInteger(dashData.warehouse?.price)
                  ? dashData.warehouse?.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  : dashData.warehouse?.price
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
