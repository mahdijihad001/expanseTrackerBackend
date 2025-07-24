const express = require("express");
const { protect } = require("../Middleware/AuthMiddleware");
const { addIncome, getAllIncome, downloadIncomeExcel, deleteIncome } = require("../Controllers/IncomeContoller");

const incomeRouter = express.Router();

incomeRouter.post("/add" , protect , addIncome);
incomeRouter.get("/getIncome" , protect , getAllIncome);
incomeRouter.get("/download" , protect , downloadIncomeExcel);
incomeRouter.delete("/:id" , protect , deleteIncome);

module.exports = incomeRouter;

