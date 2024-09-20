import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerify from "./pages/OtpVerify";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/allproduct" element={<Product />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/otpverify" element={<OtpVerify />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
