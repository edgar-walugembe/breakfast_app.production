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
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { ModalContext } from "../../../contexts/ModalContext";
import { close } from "../../../assets";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";

import { editPdtUrl_admin } from "../../../constants";
import PropTypes from "prop-types";

function EditProduct({ selectedPdtData, fetchProductData }) {
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
    fetchProductData: PropTypes.func,
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

  const handleClose = () => {
    setOpenEditPdt(false);
  };

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

  //TODO: Handle edit product to completion today.
  const handleSubmit = async (values, productId) => {
    const form = pdtRef.current;

    if (form && form.checkValidity() === true) {
      // const updatedProduct = { ...editPdt, ...values };

      // Create FormData object from the form
      const formData = new FormData(form);
      formData.append("productId", productId);
      // formData.append("img", img);

      const res = await axios.patch(
        `${editPdtUrl_admin}?productId=${productId}`,
        formData
      );

      form.reset();
      setValidated(false);

      try {
        if (res.status === 202) {
          if (editPdt && productId) {
            updateEditProduct(values);
          } else {
            setEditPdt(values);
          }
          setEditPdt(null);
        } else {
          setValidated(true);
          console.error("Failed to edit user:", res.data.message);
        }
      } catch (error) {
        console.error("Error adding user to database", error.message);
        console.error("Error details:", error);
        throw error;
      }
    } else {
      setValidated(true);
    }

    console.log("Submitted value: ", values);
    handleClose();
    fetchProductData();
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div>
      <Dialog open={openEditPdt} style={{ zIndex: 9999 }}>
        <Formik
          initialValues={{
            name: selectedPdtData?.name || "",
            unitPrice: selectedPdtData?.unitPrice || "",
            img: selectedPdtData?.img || "",
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
                  <FormControl>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Product Name"
                      type="text"
                      fullWidth
                      value={editName}
                      onChange={(e) => {
                        handleChange(e);
                        setEditName(e.target.value);
                      }}
                      error={touched.name && !!errors.name}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>

                  <FormControl>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="unitPrice"
                      label="Unit Price"
                      type="text"
                      fullWidth
                      value={editUnitPrice}
                      onChange={(e) => {
                        handleChange(e);
                        setEditUnitPrice(e.target.value);
                      }}
                      error={touched.unitPrice && !!errors.unitPrice}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>
                </div>

                <div>
                  <FormControl>
                    {/* <TextField
                      autoFocus
                      margin="dense"
                      id="img"
                      label=""
                      type="file"
                      fullWidth
                      value={values.img}
                      onChange={(e) => {
                        handleChange(e);
                        setEditImg(e.target.value);
                      }}
                      error={touched.img && !!errors.img}
                    /> */}
                    <input
                      autoFocus
                      id="img"
                      type="file"
                      onChange={(e) => {
                        handleChange(e);
                        setEditImg(e.target.files[0]);
                      }}
                      className="w-full py-2 px-3 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
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
                  type="submit"
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
