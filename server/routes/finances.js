const express = require("express");
const router = express.Router();

const {
  createRecord,
  deleteRecord,
  editRecord,
  fetchAllRecords,
} = require("../controllers/finances-controller");

const {} = require("../middlewares/order");

/* createRecord Route. */
router.post("/createRecord", createRecord);

/* deleteRecord Route. */
router.delete("/deleteRecord", deleteRecord);

/* editRecord Route. */
router.patch("/editRecord", editRecord);

/* fetchAllRecords Route. */
router.get("/", fetchAllRecords);

module.exports = router;
