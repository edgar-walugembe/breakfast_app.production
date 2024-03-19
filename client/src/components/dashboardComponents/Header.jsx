/* eslint-disable no-unused-vars */
import React from "react";
import Logo from "./Logo";

const Header = () => {
  return (
    <header
      id="header"
      className="header top-0 fixed z-10 w-full flex items-center bg-black py-2"
    >
      {/* logo */}
      <Logo />

      {/* nav */}
    </header>
  );
};

export default Header;
