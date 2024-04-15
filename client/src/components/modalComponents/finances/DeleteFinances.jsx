/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";

import { ModalContext } from "../../../contexts/ModalContext";
import { close } from "../../../assets";
import axios from "axios";
import { deleteUserUrl } from "../../../constants";
import PropTypes from "prop-types";

const DeleteFinances = ({ fetchFinances, selectedUserData }) => {
  const { openDeleteRecord, setOpenDeleteRecord, record, setRecord } =
    useContext(ModalContext);

  const [deleteRecord, setDeleteRecord] = useState(null);

  const handleClose = () => {
    setOpenDeleteRecord(false);
  };

  DeleteFinances.propTypes = {
    selectedUserData: PropTypes.object,
    fetchFinances: PropTypes.func,
  };

  const handleDelete = async (recordId) => {
    console.log("attempting to delete record:", selectedUserData);

    const res = await axios.delete(`${deleteUserUrl}?recordId=${recordId}`);

    try {
      if (res.status === 202) {
        setRecord((prevRecord) =>
          prevRecord.filter((record) => record.recordId !== recordId)
        );
      } else {
        console.error(
          "Failed to delete user from express_db:",
          res.data.message
        );
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Error deleting user from express_db:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }

    fetchFinances();
    handleClose();
  };

  return (
    <div>
      <Dialog open={openDeleteRecord} style={{ zIndex: 0 }}>
        <DialogTitle className="flex justify-between">
          <span>Delete Record</span>
          <div
            onClick={handleClose}
            className="bg-black rounded-full p-2 w-[28px] h-[28px] items-center flex"
          >
            <img src={close} alt="close" className="w-[24px] h-[24px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex gap-4">
            <p>Are you sure you want to delete this financial record ?</p>
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
            onClick={() => handleDelete(selectedUserData.recordId)}
            color="primary"
            variant="contained"
            style={{ background: "yellow", color: "black" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteFinances;
