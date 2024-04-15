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

const CreateFinances = () => {
  return <div>CreateFinances</div>;
};

export default CreateFinances;
