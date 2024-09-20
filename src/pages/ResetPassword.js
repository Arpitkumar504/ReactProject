import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../helper/BaseUrl";
import { ApiUrl } from "../helper/ApiUrl";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const validate = async () => {
    if (!email) {
      toast.success("Enter Email");
    } else if (!password) {
      toast.success("Enter Password");
    } else if (!conformPassword) {
      toast.success("Enter Conform Password");
    } else if (password !== conformPassword) {
      toast.success("Password and conform password should matched");
    } else {
      await resetPassword();
    }
  };

  const resetPassword = async () => {
    const requestData = {
      email: email,
      password: password,
      conformPassword: conformPassword,
    };
    const apiUrl = BaseUrl.SERVER_URL + ApiUrl.RESET_PASSWORD;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const response = await axios.post(apiUrl, requestData, config);
    if (response?.data?.statusCode === 200) {
      toast.success(response?.data?.message);
      navigate("/");
    } else {
      toast.success(response?.data?.message);
    }
  };
  return (
    <div className="main">
      <div className="uppers-forgot">
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <input
            type="password"
            name="conformpassword"
            value={conformPassword}
            onChange={(e) => setConformPassword(e.target.value)}
            placeholder="Enter Conform Password"
          />
          <button type="button" onClick={() => validate()}>
            Verify Otp
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
