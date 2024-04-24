/* eslint-disable no-unused-vars */
// export default CreateProduct;
import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Button,
} from "@mui/material";

import { ModalContext } from "../../../contexts/ModalContext";
import { close } from "../../../assets";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";

import { createPdtUrl_admin } from "../../../constants";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

function CreateProduct({ fetchProductData }) {
  const { validated, setValidated, openCreatePdt, setOpenCreatePdt } =
    useContext(ModalContext);

  const handleClose = () => {
    setOpenCreatePdt(false);
  };

  CreateProduct.propTypes = {
    fetchProductData: PropTypes.func,
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

  const handleSubmit = async (values) => {
    const form = pdtRef.current;

    if (form && form.checkValidity() === true) {
      // const formData = new FormData();
      // formData.append("name", values.name);
      // formData.append("unitPrice", values.unitPrice);
      // formData.append("img", values.img);
      // formData.append("adminId", userId);

      const newProduct = {
        name: form.name.value,
        unitPrice: form.unitPrice.value,
        img: form.img.value,
        adminId: userId,
      };

      console.log("Form values:", values);
      console.log("new form values:", newProduct);

      try {
        const res = await axios.post(createPdtUrl_admin, newProduct);

        if (res.status === 201) {
          form.reset();
          setValidated(false);
        } else {
          setValidated(true);
          console.error("Failed to add product:", res.data.message);
        }
      } catch (error) {
        console.error("Error adding product to database", error.message);
        console.error("Error details:", error);
      }
    } else {
      setValidated(true);
    }

    handleClose();
    fetchProductData();
  };

  return (
    <div>
      <Dialog open={openCreatePdt} style={{ zIndex: 0 }}>
        <Formik
          initialValues={{
            name: "",
            unitPrice: "",
            img: "",
            adminId: userId,
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form
              noValidate
              validated={validated.toString()}
              ref={pdtRef}
              autoComplete="off"
            >
              <DialogTitle className="flex justify-between">
                <span>Add New Product</span>
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
                      name="name"
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
                      name="unitPrice"
                      label="Unit Price"
                      type="text"
                      fullWidth
                      value={values.unitPrice}
                      onChange={handleChange}
                      error={touched.unitPrice && !!errors.unitPrice}
                    />
                    <ErrorMessage
                      name="price"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>
                </div>

                <div className="flex gap-4">
                  <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="img"
                      name="img"
                      label="Product Image"
                      type="text"
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

export default CreateProduct;
