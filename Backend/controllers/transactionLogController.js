const mongoose = require("mongoose");
const transactionLogsSchema = require("../models/transactionLogsSchema");
const totalTransactionController = require("../controllers/totalTransactionController");

function welcome(req, res) {
  res.send("Everything is fine");
}

async function addData(req, res) {
  // console.log(req.body);
  const { description, selected, amount } = req.body;

  const addData = await transactionLogsSchema.create({
    description: description,
    amount: amount,
    type: selected,
  });
  const data = await addData;
  const value1 = await totalTransactionController(
    {
      description: description,
      amount: amount,
      type: selected,
    },
    "Add",
  );
  const totalData = await value1;
  console.log(totalData);
  // console.log(value1);
  res.json({ message: "Data Added Successfully", totalData: totalData });
}

async function getData(req, res) {
  const currentPage = req.query.currentPage - 1;
  const backendData = await transactionLogsSchema
    .find()
    .sort({ _id: -1 })
    .limit(5)
    .skip(currentPage * 5);
  const dataLength = await transactionLogsSchema.estimatedDocumentCount();
  const count = dataLength;
  // console.log(count);
  // console.log(backendData);
  // const data =  backendData
  const getTotalData = await totalTransactionController();
  // const totalData = await getTotalData;

  res.json({
    data: backendData,
    count: count,
    totalData: getTotalData,
  });
}

async function updateData(req, res) {
  // console.log(req.body);
  const { id, updatedData } = req.body;
  const [description, selected, amount] = updatedData;

  const findData = await transactionLogsSchema.find({ _id: id });
  const foundData = await findData;

  const updateData = await transactionLogsSchema.findOneAndUpdate(
    { _id: id },
    { type: selected, description: description, amount: amount },
    { new: true },
  );
  // console.log(updateData);
  const value = await updateData;
  // console.log(foundData[0]);
  const value1 = await totalTransactionController(foundData[0], "Delete");
  const value1Value = await value1;
  const value2 = await totalTransactionController(
    { type: selected, description: description, amount: amount },
    "Add",
  );
  const value2Value = await value2;
  // console.log(value1, "\n", value2);
  res.json({
    message: "Data updated Successfully!!!!!",
    totalData: value2Value,
  });
}

async function deleteData(req, res) {
  const id = req.body.id;
  const deletedData = await transactionLogsSchema.findOneAndDelete({ _id: id });
  const data = await deletedData;
  // console.log(data);
  const value1 = await totalTransactionController(data, "Delete");
  // console.log(value1);
  // console.log(data);
  // console.log(id);
  const value1Value = await value1;
  res.json({
    message: "Data deleted Successfully!!!!!",
    totalData: value1Value,
  });
}

module.exports = [welcome, addData, getData, updateData, deleteData];
