import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Constant from "../helper/constant";

const SignUp = () => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token != null) {
      navigate("/Home");
    } else {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({ ...formdata, [name]: e.target.files[0] });
      return;
    }
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const validate = async () => {
    console.log("inside validate");
    if (isSignUp) {
      if (formdata.firstName === "") {
        toast.success("Enter First Name");
      } else if (formdata.lastName === "") {
        toast.success("Enter Last Name");
      } else if (formdata.email === "") {
        toast.success("Enter Email");
      } else if (formdata.password === "") {
        toast.success("Enter Password");
      } else if (formdata.password !== formdata.confirmPassword) {
        toast.success("Password not Matched");
      } else {
        Create();
      }
    } else {
      if (!email) {
        toast.success("Enter Email");
      } else if (!password) {
        toast.success("Enter Password");
      } else {
        await login();
      }
    }
  };
  const Create = async () => {
    const formData = new FormData();
    formData.append("firstName", formdata.firstName);
    formData.append("lastName", formdata.lastName);
    formData.append("email", formdata.email);
    formData.append("password", formdata.password);
    formData.append("image", formdata.image);
    const apiUrl = "http://localhost:8080/api/signUp";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      validateStatus: () => true,
    };
    const response = await axios.post(apiUrl, formData, config);
    if (response?.data?.statusCode === 200) {
      localStorage.setItem(
        Constant.Token,
        JSON.stringify(response?.data?.userData?.token)
      );
      toast.success(response?.data?.message);
      navigate("/Home");
    } else {
      toast.success("Something went wrong");
    }
  };

  const login = async () => {
    const requestData = {
      email: email,
      password: password,
    };
    console.log("inside login");
    console.log("request data of login -------- ", requestData);
    const apiUrl = "http://localhost:8080/api/login";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const response = await axios.post(apiUrl, requestData, config);
    if (response?.data?.statusCode === 200) {
      localStorage.setItem(
        Constant.Token,
        JSON.stringify(response?.data?.token)
      );
      toast.success(response?.data?.message);
      navigate("/Home");
    } else if (response?.data.statusCode === 404) {
      toast.success(response?.data?.message);
    } else {
      toast.success("User Not Found");
    }
  };
  return (
    <div className="main">
      <div className="uppers">
        <div className="signup-form-container">
          <form onSubmit={handleSubmit} className="signup-form">
            {isSignUp ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={formdata.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formdata.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formdata.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formdata.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <input
                  type="file"
                  name="image"
                  value={formdata.file}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </>
            )}
            <button type="submit" onClick={validate}>
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
            {!isSignUp && (
              <button type="button" onClick={() => navigate("/forgotpassword")}>
                Forgot password
              </button>
            )}
            <a
              type="submit"
              onClick={() => {
                setIsSignUp(!isSignUp);
              }}
              className="signup"
            >
              {!isSignUp ? "Sign Up" : "Log In"}
            </a>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
