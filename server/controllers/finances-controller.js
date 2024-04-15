const { Finances, Sequelize, sequelize } = require("../database/models");

// get all records
async function fetchAllRecords(req, res) {
  try {
    const records = await Finances.findAll();
    return res.status(200).send({ records });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// create new Record
async function createRecord(req, res) {
  try {
    const record = await Finances.create(req.body);

    return res.status(201).send({ record });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// delete a record
async function deleteRecord(req, res, next) {
  try {
    const recordId = parseInt(req.query.recordId);

    const deletedRows = await Finances.destroy({
      where: { recordId: recordId },
    });

    if (deletedRows > 0) {
      return res.status(202).send({
        message: `Financial Record with id ${recordId} deleted successfully`,
      });
    } else {
      return res
        .status(404)
        .send({ error: `Financial Record with id ${recordId} not found` });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ error: "An error occurred while processing the request" });
  }
}

// edit a record
async function editRecord(req, res, next) {
  try {
    const recordId = parseInt(req.query.recordId);

    const editedData = req.body;

    const [editedRows] = await User.update(editedData, {
      where: { recordId: recordId },
    });

    const editedRecord = await Finances.findOne({
      where: { recordId: recordId },
    });

    if (editedRows === 0) {
      return res.status(304).send(`record id: ${recordId} not changed`);
    } else {
      return res.status(202).send({
        message: `record id: ${recordId} updated successfully`,
        record: editedRecord,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
}

module.exports = {
  createRecord,
  deleteRecord,
  editRecord,
  fetchAllRecords,
};
