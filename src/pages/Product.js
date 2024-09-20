import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../component/Card";

const Product = () => {
  const [response, setAllProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    console.log("inside get products");
    const apiUrl = "http://localhost:8080/api/products/";
    const response = await axios.get(apiUrl);
    console.log("response of get all product api--- ", response?.data);
    setAllProducts(response?.data);
  };

  const deleteProduct = async (id) => {
    console.log("inside get products");
    const apiUrl = "http://localhost:8080/api/products/" + id;
    const response = await axios.delete(apiUrl);
    console.log("response of delete product api--- ", response);
    // setAllProducts(response?.data);
    if (response.data.statusCode === 200) {
      toast.success(response?.data?.message);
      getProducts();
    }
  };
  return (
    <div className="container">
      <h1>All products</h1>
      <div className="cardgroup">
        {response?.map((e, index) => {
          return <Card item={e} key={index} deleteProduct={deleteProduct} />;
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;
