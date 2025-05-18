const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Controller to handle order creation and decrement product quantities
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, paymentInfo } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items provided");
  }

  // Validate product quantities and decrement
  for (const item of orderItems) {
    const product = await Product.findById(item.productId);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.productId}`);
    }
    if (product.quantity < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient quantity for product: ${product.title}`);
    }
  }

  // Decrement quantities
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { quantity: -item.quantity },
    });
  }

  // Placeholder for payment processing logic
  // TODO: Integrate payment gateway here

  res.status(201).json({
    message: "Order created and product quantities updated successfully",
  });
});

module.exports = { createOrder };
