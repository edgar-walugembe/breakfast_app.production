/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FiPlusCircle } from "react-icons/fi";
import { TbShoppingCartPlus } from "react-icons/tb";

//context imports
import { UserOrderContext } from "../../contexts/UserOrderContext";

//modal imports
import { CreateOrder } from "../modalComponents";

const Card = ({ name, unitPrice, img }) => {
  //order State
  const { setCount } = useContext(UserOrderContext);
  const [openOrder, setOpenOrder] = useState(false);

  //order modal
  const handleToggle = () => {
    setOpenOrder((prevState) => !prevState);
  };

  const increaseCount = () => {
    console.log("increaseCount");
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="col-12 md:col-6 lg:col-4 relative">
      <div className="card flex flex-col rounded bg-white">
        <div className="card.img">
          <img src={img} alt={name} className="w-full h-[200px] rounded-t-md" />
        </div>

        <h3 className="text-center font-medium text-[16px]">{name}</h3>

        <span className="text-center text-black font-medium mx-14 mb-1">
          Shs.{unitPrice}
        </span>

        <div
          className="icon.box absolute mt-0 mr-0 flex items-center justify-center bg-amber rounded"
          style={{ width: "2.5rem", height: "2.5rem" }}
          onClick={increaseCount}
        >
          <TbShoppingCartPlus size={24} className=" text-white font-semibold" />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  unitPrice: PropTypes.number,
};

export default Card;
