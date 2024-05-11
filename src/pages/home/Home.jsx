import React from 'react'
import "./Home.css"
import { TiPlus } from "react-icons/ti";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
      <div className="container">
        <div className="main_left">
          <div className="client_box">
            <div className="main_left-head">MIJOZ</div>
            <div className="clients box_link">
              <div>
                <Link to={"/client/all"}>Mijozlar</Link>
              </div>
              <p><TiPlus />Qo'sh</p>
            </div>
          </div>
          <div className="product_box">
            <div className="main_left-head">MAHSULOT</div>
            <div className="expenses box_link">
              <div>Xarajatlar</div>
              <p><TiPlus />Qo'sh</p>
            </div>
            <div className="products box_link">
              <div>Mahsulotlar</div>
              <p><TiPlus />Qo'sh</p>
            </div>
          </div>
          <div className="sale_box">
            <div className="main_left-head">Chegirma</div>
            <div className="sales box_link">
              <div>Chegirmalar</div>
              <p><TiPlus />Qo'sh</p>
            </div>
          </div>
          <div className="use_box">
            <div className="main_left-head">FOYDALANUVCHI</div>
            <div className="users box_link">
              <div>Foydalanuvchilar</div>
              <p><TiPlus />Qo'sh</p>
            </div>
          </div>
        </div>
        <div className="main_right">
          <div className="main_right-head">
            <h3>Saytimizga xush kelibsiz!</h3>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home