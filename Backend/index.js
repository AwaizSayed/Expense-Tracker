const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const transactionLogRoute = require("./routers/transactionLogRoute");
app.use(express.json());
dotenv.config();

app.use(cors({ origin: [`${process.env.FRONTEND_URL}`] }));

app.use("/transactionLog", transactionLogRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then((value) => {
    console.log("database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Everthing is working!");
});

app.listen(8080, () => {
  console.log("hello");
});
