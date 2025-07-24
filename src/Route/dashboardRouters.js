const express  = require("express");
const { protect } = require("../Middleware/AuthMiddleware");
const { dashboardController } = require("../Controllers/dashboardController");

const dashboardRoutes = express.Router();

dashboardRoutes.get("/data" , protect , dashboardController);

module.exports = dashboardRoutes;
