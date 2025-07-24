const express = require("express");
const { addExpanse, getAllIExpanse, downloadExpanseExcel, deleteExpanse } = require("../Controllers/ExpanseController");
const { protect } = require("../Middleware/AuthMiddleware");

const expanseRoutes = express.Router();

expanseRoutes.post("/add" , protect , addExpanse);
expanseRoutes.get("/getExpanses" , protect , getAllIExpanse);
expanseRoutes.get("/download" , protect , downloadExpanseExcel);
expanseRoutes.delete("/:id" , protect , deleteExpanse);

module.exports = expanseRoutes;