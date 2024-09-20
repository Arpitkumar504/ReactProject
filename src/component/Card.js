import React from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const Card = ({ item, deleteProduct }) => {
  return (
    <div className="card">
      <Link to={`/productdetail/${item.id}`}>
        <h1 className="title">{item?.title?.slice(0, 10)}</h1>
      </Link>
      <img src={item?.thumbnail} className="image" alt="images" />
      <AiFillDelete className="icon" onClick={() => deleteProduct(item.id)} />
    </div>
  );
};
export default Card;
