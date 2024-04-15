/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Menu, Navbar } from "../../../components/dashboardComponents";
import { ModalContext } from "../../../contexts/ModalContext";
import { Outlet } from "react-router-dom";
import "./home.css";

import axios from "axios";
import { baseUrl, getPdtUrl_admin, getUserUrl } from "../../../constants";
import {
  BarChart,
  Boxes,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Receipt,
  Settings,
  UserCircle,
} from "lucide-react";
import Header from "../../../components/dashboardComponents/Header";

const Home = () => {
  //product State
  const [product, setProduct] = useState([]);
  const [openCreatePdt, setOpenCreatePdt] = useState(false);
  const [openDeletePdt, setOpenDeletePdt] = useState(false);
  const [openEditPdt, setOpenEditPdt] = useState(false);
  const [editPdt, setEditPdt] = useState({
    name: "",
    unitPrice: "",
    adminId: "",
    img: "",
  });

  //user State
  const [user, setUser] = useState([]);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    company: "",
    userType: "",
    status: "",
    img: "",
  });

  //finances State
  const [finances, setFinances] = useState([]);
  const [openCreateFinances, setOpenCreateFinances] = useState(false);
  const [openDeleteFinances, setOpenDeleteFinances] = useState(false);
  const [openEditFinances, setOpenEditFinances] = useState(false);
  const [editFinances, setEditFinances] = useState({
    name: "",
    email: "",
    company: "",
    userType: "",
    status: "",
    img: "",
  });

  const [validated, setValidated] = useState(false);
  const [data, setData] = useState([]);
  const [pdtData, setPdtData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchProductData();
    fetchFinanceData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(getUserUrl);

      setData(res.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const res = await axios.get(getPdtUrl_admin);

      const productsWithDataAndImages = res.data.products.map((product) => ({
        ...product,
        img: product.img ? `${baseUrl}/images/${product.img}` : null, // Assuming the backend serves images at /api route
      }));
      setPdtData(productsWithDataAndImages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFinanceData = async () => {
    try {
      const res = await axios.get();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className="home h-full">
      <Header />
      <div className="flex mt-[40px]">
        <ModalContext.Provider
          value={{
            product,
            setProduct,
            openCreatePdt,
            openDeletePdt,
            openEditPdt,
            setOpenCreatePdt,
            setOpenDeletePdt,
            setOpenEditPdt,
            user,
            setUser,
            openCreateUser,
            openDeleteUser,
            openEditUser,
            setOpenCreateUser,
            setOpenDeleteUser,
            setOpenEditUser,
            finances,
            setFinances,
            openCreateFinances,
            openDeleteFinances,
            openEditFinances,
            setOpenCreateFinances,
            setOpenDeleteFinances,
            setOpenEditFinances,
            data,
            setData,
            pdtData,
            setPdtData,
            userData,
            setUserData,
            financeData,
            setFinanceData,
            validated,
            setValidated,
            editUser,
            setEditUser,
            editPdt,
            setEditPdt,
            editFinances,
            setEditFinances,
          }}
        >
          <Menu />
          <div className={`w-full ml-[250px]`}>
            <Navbar />

            <div className="outlet surface-ground">
              <Outlet fetchData={fetchData} />
            </div>
          </div>
        </ModalContext.Provider>
      </div>
    </section>
  );
};

export default Home;
