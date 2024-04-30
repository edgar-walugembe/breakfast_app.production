/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState, useEffect } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { UserOrderContext } from "../../../contexts/UserOrderContext";
import axios from "axios";

const CreateOrder = ({ name, unitPrice, increaseCount }) => {
  //propTypes
  CreateOrder.propTypes = {
    name: PropTypes.string,
    unitPrice: PropTypes.number,
    increaseCount: PropTypes.func,
  };

  //context
  const { setOpenOrder } = useContext(UserOrderContext);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleClose = () => {
    setOpenOrder(false);
  };

  const handleSubmit = async (values) => {
    //total
    const total = unitPrice * quantity;
    const storedUserId = localStorage.getItem("userId");
    const orderData = {
      name,
      unitPrice,
      quantity,
      total,
      userId: storedUserId,
    };

    try {
      const res = await axios.post();

      if (res.status === 201) {
        console.log("message: ", res.data.message);
      } else {
        console.error("Order Failed: ", res.data.message);
      }
    } catch (error) {
      console.error("Error adding order to database", error.message);
      console.error("Error details:", error);
    }

    handleClose();
  };

  return (
    <div className="dropdown p-2 absolute bg-cyan ">
      <div className="dropdown-content">
        <p>Name: {name}</p>
        <p>Unit Price: {unitPrice}</p>
        <label>
          Quantity:
          <select name={name} onChange={handleQuantityChange}>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <p>Total: {unitPrice * quantity}</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Button
          color="primary"
          variant="contained"
          style={{ background: "amber", color: "black" }}
          size="sm"
          onClick={handleSubmit}
        >
          Order
        </Button>
      </div>
    </div>

    //FIXME: Remove when u separate the different modals.
    // <div>
    //   <Dialog open={openOrder} style={{ zIndex: 9999 }}>
    //     <Formik
    //       initialValues={{
    //         name: "",
    //         unitPrice: "",
    //         img: "",
    //         userId: userId,
    //       }}
    //       validationSchema={schema}
    //       onSubmit={(values, { setSubmitting }) => {
    //         handleSubmit(values);
    //         setSubmitting(false);
    //       }}
    //     >
    //       {({ values, handleChange, errors, touched }) => (
    //         <Form
    //           noValidate
    //           validated={validated.toString()}
    //           ref={orderRef}
    //           autoComplete="off"
    //         >
    //           <DialogTitle className="flex justify-between">
    //             <span>ORDER</span>
    //             <div
    //               onClick={handleClose}
    //               className="bg-black rounded-full p-2 w-[28px] h-[28px] items-center flex"
    //             >
    //               <img src={close} alt="close" className="w-[24px] h-[24px]" />
    //             </div>
    //           </DialogTitle>
    //           <DialogContent>
    //             <div className="flex gap-4">
    //               <FormControl autoFocus fullWidth margin="dense">
    //                 <TextField
    //                   required
    //                   autoFocus
    //                   margin="dense"
    //                   id="name"
    //                   name="name"
    //                   label="Name"
    //                   type="text"
    //                   fullWidth
    //                   value={name}
    //                   disabled
    //                 />
    //               </FormControl>
    //               <FormControl autoFocus fullWidth margin="dense">
    //                 <TextField
    //                   required
    //                   autoFocus
    //                   margin="dense"
    //                   id="unitPrice"
    //                   name="unitPrice"
    //                   label="Unit Price"
    //                   type="number"
    //                   fullWidth
    //                   value={unitPrice}
    //                   disabled
    //                 />
    //               </FormControl>
    //             </div>
    //             <div className="flex gap-4">
    //               <FormControl autoFocus fullWidth margin="dense">
    //                 <InputLabel id="img-label">Image</InputLabel>
    //                 <Input
    //                   id="img"
    //                   name="img"
    //                   type="text"
    //                   fullWidth
    //                   value={img}
    //                   disabled
    //                 />
    //               </FormControl>
    //             </div>
    //           </DialogContent>
    //           <DialogActions>
    //             <Button
    //               onClick={handleClose}
    //               color="primary"
    //               variant="contained"
    //               style={{ background: "cyan", color: "black" }}
    //             >
    //               Cancel
    //             </Button>
    //             <Button
    //               type="submit"
    //               color="primary"
    //               variant="contained"
    //               style={{ background: "yellow", color: "black" }}
    //             >
    //               Save
    //             </Button>
    //           </DialogActions>
    //         </Form>
    //       )}
    //     </Formik>
    //   </Dialog>
    // </div>
  );
};

export default CreateOrder;
