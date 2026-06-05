const mongoose = require("mongoose");

const totalTransactionSchema = mongoose.Schema({
  totalIncome: { type: Number },
  totalExpense: { type: Number },
  remainingAmount: { type: Number },
});

module.exports = mongoose.model("totalTransaction", totalTransactionSchema);
