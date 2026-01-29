import Order from "./order.model.js";

export const createOrder = async (orderData) => {
  const order = await Order.create(orderData);
  return order;
};

export const findOrdersByUser = async (userId) => {
  return await Order.find({ user: userId })
    .populate("items.product", "name price")
    .sort({ createdAt: -1 });
};
