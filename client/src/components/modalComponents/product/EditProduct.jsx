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

  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleClose = () => {
    setOpenEditPdt(false);
  };

  //TODO: Handle edit product to completion today.
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("unitPrice", values.unitPrice);
    formData.append("img", selectedFile);

    try {
      // Make an HTTP request to update the product with the FormData
      const response = await axios.put(editPdtUrl_admin, formData);
      console.log("Product updated successfully:", response.data);
      // Close the dialog or perform any other actions upon successful submission
      handleClose();
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error appropriately, e.g., display error message
    }
  };

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
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Product Name"
                    type="text"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="unitPrice"
                    label="Unit Price"
                    type="text"
                    fullWidth
                    value={values.unitPrice}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="img"
                    label=""
                    type="file"
                    fullWidth
                    value={values.img}
                    // onChange={handleChange}
                    onChange={(event) => setSelectedFile(event.target.files[0])}
                  />
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
