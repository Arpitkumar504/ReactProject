import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  console.log("items---- ", id);
  const [response, setAllProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    console.log("inside get products");
    const apiUrl = "http://localhost:8080/api/products/" + id;
    console.log("api url of to get specific product--- ", apiUrl);
    const response = await axios.get(apiUrl);
    console.log("response of get specific product api--- ", response?.data);
    setAllProducts(response?.data?.datas[0]);
  };

  return (
    <div className="container">
      <h1>{response?.title}</h1>
      <img src={response?.thumbnail} className="image" alt="images" />
    </div>
  );
};

export default ProductDetail;
