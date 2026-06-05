const { model } = require("mongoose");
const totalTransactionSchema = require("../models/totalTransactionSchema");

async function totalTransaction(data = {}, operation = "") {
  const databaseDataRetrieval = await totalTransactionSchema.find();
  const databaseData = await databaseDataRetrieval;
  if (JSON.stringify(data) === "{}" && operation === "") {
    return await databaseData[0];
  }
  if (databaseData.length === 0 && data.type === "Income") {
    const createData = await totalTransactionSchema.create({
      totalIncome: data.amount,
      totalExpense: 0,
      remainingAmount: data.amount,
    });
    return await createData;
  }
  if (databaseData.length === 0 && data.type === "Expense") {
    const remainingAmount = -data.amount;
    const createData = await totalTransactionSchema.create({
      totalIncome: 0,
      totalExpense: data.amount,
      remainingAmount: remainingAmount,
    });
    return await createData;
  }

  if (data.type === "Income" && operation === "Add") {
    // console.log("Database data:-\n", databaseData[0]);
    // console.log(typeof databaseData[0].totalIncome);
    const newTotalIncome = databaseData[0].totalIncome + Number(data.amount);
    const newRemaining = databaseData[0].remainingAmount + Number(data.amount);
    const updateData = await totalTransactionSchema.findOneAndUpdate(
      { _id: databaseData[0]._id },
      {
        totalIncome: newTotalIncome,
        remainingAmount: newRemaining,
      },
    );
    const value = await updateData;
    return value;
  }
  if (data.type === "Income" && operation === "Delete") {
    // console.log('Database data:-\n',databaseData[0]);
    const newTotalIncome = databaseData[0].totalIncome - data.amount;
    const newRemaining = databaseData[0].remainingAmount - data.amount;
    const updateData = await totalTransactionSchema.findOneAndUpdate(
      { _id: databaseData[0]._id },
      {
        totalIncome: newTotalIncome,
        remainingAmount: newRemaining,
      },
    );
    const value = await updateData;
    return value;
  }
  if (data.type === "Expense" && operation === "Add") {
    // console.log('Database data:-\n',databaseData[0]);
    const newTotalExpense = databaseData[0].totalExpense + Number(data.amount);
    const newRemaining = databaseData[0].remainingAmount - data.amount;
    const updateData = await totalTransactionSchema.findOneAndUpdate(
      { _id: databaseData[0]._id },
      {
        totalExpense: newTotalExpense,
        remainingAmount: newRemaining,
      },
      { new: true },
    );
    const value = await updateData;
    return value;
  }
  if (data.type === "Expense" && operation === "Delete") {
    // console.log('Database data:-\n',databaseData[0]);
    const newTotalExpense = databaseData[0].totalExpense - data.amount;
    const newRemaining = databaseData[0].remainingAmount + Number(data.amount);
    const updateData = await totalTransactionSchema.findOneAndUpdate(
      { _id: databaseData[0]._id },
      {
        totalExpense: newTotalExpense,
        remainingAmount: newRemaining,
      },
    );
    const value = await updateData;
    return value;
  }
}

module.exports = totalTransaction;
