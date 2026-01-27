import * as orderRepository from "./order.repository.js";

export const placeOrder = async (userId, items) => {
  // calculate total logic
  const total = 500;
  return await orderRepository.createOrder({ userId, items, total });
};

export const getUserOrders = async (userId) => {
  return await orderRepository.findOrdersByUser(userId);
};
