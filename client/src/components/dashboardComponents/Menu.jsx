/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

//images imports
import { favicon, favicon00, logo, odyssey_logo } from "../../assets";

//icon imports
import { FaUsers, FaUserCircle } from "react-icons/fa";
import { IoFastFood, IoCartOutline } from "react-icons/io5";
import { GiCash } from "react-icons/gi";
import { IoIosExit } from "react-icons/io";

const Menu = () => {
  const [isActive, setIsActive] = useState(1);

  const toggleActive = (divId) => {
    setIsActive(divId === isActive ? null : divId);
  };

  return (
    <div
      className={`menu w-[250px] h-full fixed flex flex-col items-center justify-center`}
    >
      <div className="flex flex-col justify-between gap-5  w-full">
        <div
          className={`rounded menuSpan ${isActive === 1 ? "active" : ""}`}
          onClick={() => toggleActive(1)}
        >
          <Link
            to="/Admin/Dashboard/orders/all"
            className="flex justify-evenly w-full p-2"
          >
            <IoCartOutline className="w-[24px] h-[24px] text-white" />
            <span className="text-white">Orders</span>
          </Link>
        </div>

        <div
          className={`rounded menuSpan ${isActive === 2 ? "active" : ""}`}
          onClick={() => toggleActive(2)}
        >
          <Link
            to="/Admin/Dashboard/users/all"
            className="flex justify-evenly w-full p-2 "
          >
            <FaUsers className="w-[24px] h-[24px] text-white" />
            <span className="text-white">Users</span>
          </Link>
        </div>

        <div
          className={`rounded menuSpan ${isActive === 3 ? "active" : ""}`}
          onClick={() => toggleActive(3)}
        >
          <Link
            to="/Admin/Dashboard/products/all"
            className="flex justify-evenly w-full p-2"
          >
            <IoFastFood className="w-[24px] h-[24px] text-white" />
            <span className="text-white">Products</span>
          </Link>
        </div>

        <div
          className={`rounded menuSpan ${isActive === 4 ? "active" : ""}`}
          onClick={() => toggleActive(4)}
        >
          <Link
            to="/Admin/Dashboard/finances/"
            className="flex justify-evenly w-full p-2"
          >
            <GiCash className="w-[24px] h-[24px] text-white" />
            <span className="text-white">Finances</span>
          </Link>
        </div>

        <div className={`rounded menuSpan `}>
          <Link to="/User/Home" className="flex justify-evenly w-full p-2">
            <FaUserCircle className="w-[24px] h-[24px] text-white" />
            <span className="text-white">User Page</span>
          </Link>
        </div>

        <div className={`rounded menuSpan `}>
          <Link to="/" className="flex justify-evenly w-full p-2">
            <IoIosExit className="w-[24px] h-[24px] text-white" />
            <span className="text-white">Log Out</span>
          </Link>
        </div>
      </div>

      {/* <div className="mb-4 sm:mb-2 items-center flex justify-center">
        <Link to="https://www.odysseytech.co/">
          <img
            src={odyssey_logo}
            alt="odyssey_logo"
            className={`h-[50px] hidden sm:inline`}
          />
        </Link>

        <Link to="https://www.odysseytech.co/">
          <img
            src={favicon00}
            alt="odyssey_logo"
            className={`h-[50px] inline sm:hidden`}
          />
        </Link>
      </div> */}
    </div>
  );
};

export default Menu;
