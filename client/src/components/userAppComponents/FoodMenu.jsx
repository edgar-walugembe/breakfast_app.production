/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";

// import PropTypes from "prop-types";
// import { cards } from "../../constants";
import Card from "./Card";

//context import
import { UserOrderContext } from "../../contexts/UserOrderContext";
import axios from "axios";
import { getPdtUrl_admin, baseUrl } from "../../constants";

const FoodMenu = () => {
  //order State
  const { setCount } = useContext(UserOrderContext);

  const increaseCount = () => {
    console.log("increaseCount");
    setCount((prevCount) => prevCount + 1);
  };

  const decreaseCount = () => {
    console.log("decreaseCount");
    setCount((prevCount) => prevCount - 1);
  };

  //data from database
  const [pdtData, setPdtData] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const res = await axios.get(getPdtUrl_admin);

      const productsWithDataAndImages = res.data.products.map((product) => ({
        ...product,
        // img: product.img ? `${baseUrl}/images/${product.img}` : null, // Assuming the backend serves images at /api route
      }));
      setPdtData(productsWithDataAndImages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="surface-ground px-2 py-1 md:px-4 lg:px-6 ">
      <div className="grid">
        <h3>Snacks Available</h3>
      </div>

      {/* <div>
        <button onClick={increaseCount}>Increase Count</button>
        <button onClick={decreaseCount}>Decrease Count</button>
      </div> */}

      <div className="grid cards">
        {pdtData.map((product) => (
          <Card key={product.productId} {...product} />
        ))}
      </div>
    </div>
  );
};

// FoodMenu.propTypes = {
//   count: PropTypes.number,
//   decreaseCount: PropTypes.func,
//   increaseCount: PropTypes.func,
// };

export default FoodMenu;
