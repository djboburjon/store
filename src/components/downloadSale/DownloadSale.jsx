import React, { useState } from "react";
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

    fetch(`${baseUrl}user/select/?search=${onUser}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUserAll(result);
        setLoading(false);
        if (result.length > 0) {
          downloadFile(result[0].id);
        } else {
          console.error("No users found");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  const downloadFile = async (userId) => {
    try {
      const response = await axios({
        url: `${baseUrl}sale/export/?from_date=${fromDate}&pk=${userId}&to_date=${toDate}`,
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
    } catch (error) {
      console.error("Error exporting sales to Excel:", error);
    }
  };

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
            userSelect();
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
          <input
            onChange={(e) => {
              setOnUser(e.target.value);
            }}
            type="text"
            placeholder="Username"
          />
          <button>Faylni yuklash</button>
        </form>
      </div>
    </div>
  );
}

export default DownloadSale;
