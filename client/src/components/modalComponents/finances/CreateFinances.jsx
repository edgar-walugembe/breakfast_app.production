/* eslint-disable no-unused-vars */
import React, { useContext, useRef } from "react";

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
  Input,
} from "@mui/material";

import { ModalContext } from "../../../contexts/ModalContext";
import { close } from "../../../assets";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";

import { createUserUrl } from "../../../constants";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { useState } from "react";
import { useEffect } from "react";

const CreateFinances = ({ fetchFinances }) => {
  const { openCreateFinances, setOpenCreateFinances, validated, setValidated } =
    useContext(ModalContext);

  const handleClose = () => {
    setOpenCreateFinances(false);
  };

  CreateFinances.propTypes = {
    fetchFinances: PropTypes.func,
  };

  const financeRef = useRef("null");

  const schema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    currentDebt: Yup.number().integer().required("Current Debt is required"),
    paidDebt: Yup.number().integer().required("Paid Debt is required"),
    balance: Yup.number().integer().required("Balance Debt is required"),
    status: Yup.string().required("Debt Status is required"),
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

  return (
    <div>
      <Dialog open={openCreateFinances} style={{ zIndex: 0 }}>
        <Formik
          initialValues={{
            name: "",
            currentDebt: "",
            paidDebt: "",
            balance: "",
            status: "",
            adminId: userId,
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            // saveUser(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form
              noValidate
              validated={validated.toString()}
              ref={financeRef}
              autoComplete="off"
            >
              <DialogTitle className="flex justify-between">
                <span>Add New User</span>
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
                      required
                      autoFocus
                      margin="dense"
                      id="name"
                      name="name"
                      label="Username"
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
                      required
                      autoFocus
                      margin="dense"
                      id="email"
                      name="email"
                      label="E-mail"
                      type="email"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && !!errors.email}
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>
                </div>

                <div className="flex gap-4">
                  <FormControl autoFocus fullWidth margin="dense">
                    <InputLabel id="company-label">Company</InputLabel>
                    <Select
                      labelId="company-label"
                      id="company"
                      name="company"
                      value={values.company}
                      label="Company"
                      onChange={handleChange}
                      error={touched.company && !!errors.company}
                    >
                      <MenuItem value={"Odyssey"}>Odyssey</MenuItem>
                      <MenuItem value={"Upti"}>Upti</MenuItem>
                    </Select>
                    <ErrorMessage
                      name="company"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>

                  <FormControl autoFocus fullWidth margin="dense">
                    <InputLabel id="type-label">User Type</InputLabel>
                    <Select
                      labelId="type-label"
                      id="userType"
                      name="userType"
                      value={values.userType}
                      label="User Type"
                      onChange={handleChange}
                      error={touched.userType && !!errors.userType}
                    >
                      {/* <MenuItem value="">Select User Type</MenuItem> */}
                      <MenuItem value={"SuperAdmin"}>SuperAdmin</MenuItem>
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"User"}>User</MenuItem>
                    </Select>
                    <ErrorMessage
                      name="userType"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>
                </div>

                <div className="flex gap-4">
                  <FormControl autoFocus fullWidth margin="dense">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      name="status"
                      value={values.status}
                      label="Status"
                      onChange={handleChange}
                      error={touched.status && !!errors.status}
                    >
                      <MenuItem value={"Active"}>Active</MenuItem>
                      <MenuItem value={"Inactive"}>Inactive</MenuItem>
                      <MenuItem value={"Suspended"}>Suspended</MenuItem>
                    </Select>
                    <ErrorMessage
                      name="status"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>

                  <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="img"
                      name="img"
                      type="file"
                      fullWidth
                      onChange={handleChange}
                    />

                    {/* error={touched.img && !!errors.img} */}
                    {/* <ErrorMessage
                      name="img"
                      component="p"
                      className="text-red-600"
                    /> */}
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
                  color="primary"
                  variant="contained"
                  style={{ background: "yellow", color: "black" }}
                  type="submit"
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
};

export default CreateFinances;
