const express = require("express");
const { createOrder } = require("../controller/orderCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Route to create an order and decrement product quantities
router.post("/", authMiddleware, createOrder);

module.exports = router;
