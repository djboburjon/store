import React from "react";
import "./Home.css";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";

function Home() {
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

          <Link to={"/"}>
            <div className="sales box_link">Chegirmalar</div>
          </Link>

          <Link to={"/"}>
            <div className="users box_link">Foydalanuvchilar</div>
          </Link>
        </div>
        <div className="main_right">
          <div className="main_right-head">
            <h3>Saytimizga xush kelibsiz!</h3>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
