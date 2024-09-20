import React from "react";
import { NavLink } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";

const NoPage = () => {
  return (
    <div class="container nopage">
      <div className="box">
        <div>
          <BiError className="nopageicons" />
        </div>
        <h1>404 : Page Not Found</h1>
      </div>
      <NavLink to="/" className="nopagelink">
        <button type="button" className="nopagebtn">
          <AiFillHome /> Return Home
        </button>
      </NavLink>
    </div>
  );
};

export default NoPage;
