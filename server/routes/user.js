const express = require("express");
const router = express.Router();

const {
  createUser,
  deleteUser,
  editUser,
  fetchAllUsers,
} = require("../controllers/user-controller");

/*userRole Route */
router.get("/", function (req, res) {
  res.json({ message: "users route accessed" });
});

/* createUser Route. */
router.post("/createUser", createUser);

/* deleteUser Route. */
router.delete("/deleteUser", deleteUser);

/* editUser Route. */
router.patch("/editUser", editUser);

/* fetchAllUser Route. */
router.get("/all", fetchAllUsers);

module.exports = router;
