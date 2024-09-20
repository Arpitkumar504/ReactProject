import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { logout } from "../helper/common";
import { BaseUrl } from "../helper/BaseUrl";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));
    const apiUrl = BaseUrl.SERVER_URL + "api/GetUserProfile";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    };
    const response = await axios.get(apiUrl, config);
    console.log("reposne-- ", response);
    if (response?.data?.statusCode === 200) {
      setUserName(response?.data?.datas[0]?.firstName);
      setProfileImage(response?.data?.datas[0]?.image);
    }
  };
  return (
    <div className="container">
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            Welcome {userName} to our home page
          </h1>
          <img
            src={BaseUrl.SERVER_URL + profileImage}
            alt="imagess"
            style={{ width: "50px", height: "50px" }}
          />
          <Link to="/profile">
            <CgProfile size={40} />
          </Link>
        </div>
        <div className="upper">
          <Link to="/allproduct">
            <button className="button">View all Product</button>
          </Link>
          <Link to="/addproduct">
            <button className="button">Add Product</button>
          </Link>
          <button className="button" onClick={() => logout()}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
