const express = require("express");
const route = express.Router();
const [
  welcome,
  addData,
  getData,
  updateData,
  deleteData
] = require("../controllers/transactionLogController");

route.get("/", (req, res) => welcome(req, res));
route.post("/addData", (req, res) => addData(req, res));
route.get("/getData", (req, res) => getData(req, res));
route.put("/updateData", (req, res) => updateData(req, res));
route.delete("/deleteData",(req,res)=>deleteData(req,res));

module.exports = route;
