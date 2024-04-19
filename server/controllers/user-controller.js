const { User, Token, Sequelize, sequelize } = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");

// create new User
async function sendEmail(to, subject, body) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: body,
  };

  await transporter.sendMail(mailOptions);
}

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);

    await sendEmail(
      user.email,
      `Hello, ${user.name}. Set Your Password`,
      `
      Dear <strong>${user.name}</strong>,

      Welcome to our platform! We're thrilled to have you on board.

      Your username: <strong>${user.name}</strong>

      To get started, please set your password by clicking on the following link:

      ${process.env.CLIENT_URL}

      Thank you for joining us!,
      BREAKFAST ORDER APP.
      `
    );

    return res.status(201).send({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// get all users
async function fetchAllUsers(req, res) {
  try {
    const users = await User.findAll();
    return res.status(200).send({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// delete a user
async function deleteUser(req, res, next) {
  try {
    const userId = parseInt(req.query.userId);

    const deletedRows = await User.destroy({ where: { userId: userId } });

    if (deletedRows > 0) {
      return res
        .status(202)
        .send({ message: `User with id ${userId} deleted successfully` });
    } else {
      return res
        .status(404)
        .send({ error: `User with id ${userId} not found` });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ error: "An error occurred while processing the request" });
  }
}

// edit a user
async function editUser(req, res, next) {
  try {
    const userId = parseInt(req.query.userId);

    const editedData = req.body;

    const [editedRows] = await User.update(editedData, {
      where: { userId: userId },
    });

    const editedUser = await User.findOne({ where: { userId: userId } });

    if (editedRows === 0) {
      return res.status(304).send(`user id: ${userId} not changed`);
    } else {
      return res.status(202).send({
        message: `user id: ${userId} updated successfully`,
        user: editedUser,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
}

module.exports = {
  createUser,
  deleteUser,
  editUser,
  fetchAllUsers,
};
