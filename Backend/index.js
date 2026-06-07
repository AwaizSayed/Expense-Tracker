const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const transactionLogRoute = require("./routers/transactionLogRoute");
app.use(express.json());
dotenv.config();

async function connectIt() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then((value) => console.log("database Connected"))
    .catch((err) => console.log(err));
}
connectIt();

app.use(cors({ origin: [`${process.env.FRONTEND_URL}`] }));

app.use("/transactionLog", transactionLogRoute);

app.get("/", (req, res) => {
  res.send("Everthing is working!");
});

app.listen(8080, () => {
  console.log("hello");
});
