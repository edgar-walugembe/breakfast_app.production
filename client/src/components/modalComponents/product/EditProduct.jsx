/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

import { ModalContext } from "../../../contexts/ModalContext";
import { close } from "../../../assets";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";

import { editPdtUrl_admin } from "../../../constants";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

function EditProduct({ selectedPdtData, fetchData }) {
  const {
    openEditPdt,
    setOpenEditPdt,
    editPdt,
    setEditPdt,
    validated,
    setValidated,
  } = useContext(ModalContext);

  //handling productForm data
  const [editName, setEditName] = useState("");
  const [editUnitPrice, setEditUnitPrice] = useState("");
  const [editAdminId, setEditAdminId] = useState("");
  const [editImg, setEditImg] = useState("");

  EditProduct.propTypes = {
    selectedPdtData: PropTypes.object,
    fetchData: PropTypes.func,
  };

  useEffect(() => {
    console.log("Selected Product Data:", selectedPdtData);
    if (selectedPdtData) {
      setEditName(selectedPdtData.name || "");
      setEditUnitPrice(selectedPdtData.unitPrice || "");
      setEditAdminId(selectedPdtData.adminId || "");
      setEditImg(selectedPdtData.img || "");
    }
  }, [selectedPdtData]);

  const updateEditProduct = (newValues) => {
    setEditPdt((prevEditPdt) => ({ ...prevEditPdt, ...newValues }));
  };

  const pdtRef = useRef("null");

  const schema = Yup.object().shape({
    name: Yup.string().required("pdtName is required"),
    unitPrice: Yup.number().integer().required("pdtPrice is required"),
    img: Yup.string().required("pdtImage is required"),
    adminId: Yup.number().integer().required("adminId is required"),
  });

  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      Cookies.set("token", token, { path: "/" });
    }

    // console.log(userId);
    // console.log(token);
  }, [token, userId]);

  const handleClose = () => {
    setOpenEditPdt(false);
  };

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog open={openEditPdt} style={{ zIndex: 9999 }}>
        <Formik
          initialValues={{
            name: selectedPdtData?.name || "",
            unitPrice: selectedPdtData?.unitPrice || "",
            img: selectedPdtData?.img || "",
            adminId: selectedPdtData?.adminId || userId,
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, selectedPdtData.productId);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <Form
              noValidate
              validated={validated.toString()}
              ref={pdtRef}
              autoComplete="off"
            >
              <DialogTitle className="flex justify-between">
                <span>Edit Product</span>
                <div
                  onClick={handleClose}
                  className="bg-black rounded-full p-2 w-[28px] h-[28px] items-center flex"
                >
                  <img src={close} alt="close" className="w-[24px] h-[24px]" />
                </div>
              </DialogTitle>
              <DialogContent>
                <div className="flex gap-4">
                  <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Product Name"
                      type="text"
                      fullWidth
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && !!errors.name}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>

                  <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="unitPrice"
                      label="Unit Price"
                      type="text"
                      fullWidth
                      value={values.unitPrice}
                      onChange={handleChange}
                      error={touched.unitPrice && !!errors.unitPrice}
                    />
                    <ErrorMessage
                      name="unitPrice"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>
                </div>

                <div>
                  <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="img"
                      label=""
                      type="file"
                      fullWidth
                      value={values.img}
                      onChange={handleChange}
                      error={touched.img && !!errors.img}
                    />
                    <ErrorMessage
                      name="img"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="primary"
                  variant="contained"
                  style={{ background: "cyan", color: "black" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  style={{ background: "yellow", color: "black" }}
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export default EditProduct;
