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
    <main>
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
          
          <Link to={"/expense/all"}>
            <div className="expenses box_link">Xarajatlar</div>
          </Link>

          <Link to={"/user/current"}>
            <div className="users box_link">Foydalanuvchilar</div>
          </Link>
        </div>
        <div className="main_right">
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
                <div>
                  <p>Sotuvlar</p>
                  <div className="sales">{dashData.sales}</div>
                </div>
                <div>
                  <p>Chiqimlar</p>
                  <div className="expenses">{dashData.expenses}</div>
                </div>
              </div>
              <div className="warehouse">
                <h3>Ombor</h3>
                <div className="prices">
                  <div>
                    <p>Qoldiq Narx</p>
                    <div className="purchasePrice">
                      {dashData.warehouse?.purchase_price}
                    </div>
                  </div>
                  <div>
                    <p>Qoldiq Sotuv Narx</p>
                    <div className="price">
                    {dashData.warehouse?.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
