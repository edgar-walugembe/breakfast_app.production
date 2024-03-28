/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { UserOrderContext } from "../../../contexts/UserOrderContext";

import { Menu, Navbar } from "../../../components/userAppComponents";
import "./home.css";
import axios from "axios";
import { baseUrl, getPdtUrl_user } from "../../../constants";

const Home00 = () => {
  //count State
  const [count, setCount] = useState(0);
  const [pdtData, setPdtData] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const res = await axios.get(getPdtUrl_user);

      const productsWithDataAndImages = res.data.products.map((product) => ({
        ...product,
        img: product.img ? `${baseUrl}/images/${product.img}` : null, // Assuming the backend serves images at /api route
      }));
      setPdtData(productsWithDataAndImages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className="home h-full">
      <div className="flex">
        <UserOrderContext.Provider
          value={{ count, setCount, pdtData, setPdtData }}
        >
          <Menu />
          <div className="w-full ml-[250px]">
            <Navbar />

            <div className="outlet ">
              <Outlet />
            </div>
          </div>
        </UserOrderContext.Provider>
      </div>
    </section>
  );
};

// Home00.propTypes = {
//   count: PropTypes.number,
//   decreaseCount: PropTypes.func,
//   increaseCount: PropTypes.func,
// };

export default Home00;
