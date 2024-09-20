import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../helper/BaseUrl";
import { ApiUrl } from "../helper/ApiUrl";

const OtpVerify = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const validate = async () => {
    if (!email) {
      toast.success("Enter Email");
    } else if (!otp) {
      toast.success("Enter Otp");
    } else {
      await otpVerify();
    }
  };

  const otpVerify = async () => {
    const requestData = {
      email: email,
      otp: otp,
    };
    const apiUrl = BaseUrl.SERVER_URL + ApiUrl.OTP;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const response = await axios.post(apiUrl, requestData, config);
    if (response?.data?.statusCode === 200) {
      toast.success(response?.data?.message);
      navigate("/resetpassword");
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
            placeholder="Email"
          />
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Otp"
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

export default OtpVerify;
