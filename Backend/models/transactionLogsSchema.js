const mongoose = require("mongoose");

const transactionLogSchema = mongoose.Schema(
  {
    type: { type: String },
    amount: { type: Number },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("transactionLog", transactionLogSchema);
