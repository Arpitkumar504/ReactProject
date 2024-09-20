import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../helper/BaseUrl";
import { ApiUrl } from "../helper/ApiUrl";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const validate = () => {
    if (!email) {
      toast.success("Enter Forgot Email");
    } else {
      forgotPassword();
    }
  };

  const forgotPassword = async () => {
    const requestData = {
      email: email,
    };
    const apiUrl = BaseUrl.SERVER_URL + ApiUrl.FORGOT_PASSWORD;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const response = await axios.post(apiUrl, requestData, config);
    if (response?.data?.statusCode === 200) {
      toast.success(response?.data?.message);
      navigate("/otpverify");
    } else {
      toast.success("User Not Found");
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
            placeholder="Email"
          />
          <button type="button" onClick={() => validate()}>
            Forgot password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
