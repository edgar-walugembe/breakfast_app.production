/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { menu, close } from "../../assets";

const Logo = () => {
  const handleToggleSidebar = () => {
    document.body.classList.toggle("toggle-sidebar-btn");
  };
  return (
    <div className="flex items-center justify-between ">
      <Link to="/Admin/Dashboard" className="logo flex items-center">
        <span className="d-none d-lg-block text-white">Admin Dashboard</span>
      </Link>

      <img
        src={menu}
        alt="menu"
        className="toggle-sidebar-btn"
        // style={{ color: "black" }}
        onClick={handleToggleSidebar}
      />
    </div>
  );
};

export default Logo;
