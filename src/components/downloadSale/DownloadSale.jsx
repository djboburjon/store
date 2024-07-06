import React, { useEffect, useState } from "react";
import "./DownloadSale.css";
import axios from "axios";
import { saveAs } from "file-saver";
import { FaTimes } from "react-icons/fa";

function DownloadSale({ baseUrl, token, setDownload, setLoading }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userAll, setUserAll] = useState([]);
  const [onUser, setOnUser] = useState("");

  const userSelect = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}user/select/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUserAll(result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const downloadFile = async () => {
    try {
      const response = await axios({
        url: `${baseUrl}sale/export/?from_date=${fromDate}&pk=${onUser}&to_date=${toDate}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "downloaded_file.xlsx");
      setDownload(false);
      setLoading(false)
    } catch (error) {
      alert("Nimadir xato")
      console.error("Error exporting sales to Excel:", error);
      setLoading(false)
    }
  };

  useEffect(()=>{
    userSelect();
  }, [token])

  return (
    <div className="download">
      <div
        className="exit_btn"
        onClick={() => {
          setDownload(false);
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
            downloadFile();
          }}
        >
          <h3>Boshlanish sanasi</h3>
          <input
            onChange={(e) => {
              setFromDate(e.target.value);
            }}
            required
            type="date"
          />
          <h3>Tugash sanasi</h3>
          <input
            onChange={(e) => {
              setToDate(e.target.value);
            }}
            required
            type="date"
          />
          <h3>Foydalanuvchining ismi</h3>
          <select
            onChange={(e) => {
              setOnUser(e.target.value);
            }}
          >
            <option value="">-----</option>
            {userAll?.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.username}
                </option>
              );
            })}
          </select>
          <button>Faylni yuklash</button>
        </form>
      </div>
    </div>
  );
}

export default DownloadSale;
