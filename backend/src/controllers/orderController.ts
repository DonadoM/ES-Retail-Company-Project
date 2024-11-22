import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('items.product', 'name');
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product', 'name');
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderNumber, customerName, totalAmount, status, items } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderNumber,
      customerName,
      totalAmount,
      status,
      items
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
  const { orderNumber, customerName, totalAmount, status, items } = req.body;

  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderNumber = orderNumber || order.orderNumber;
    order.customerName = customerName || order.customerName;
    order.totalAmount = totalAmount || order.totalAmount;
    order.status = status || order.status;
    order.items = items || order.items;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.remove();
    res.json({ message: 'Order removed' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };

console.log('Order controller created successfully');