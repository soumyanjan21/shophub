import * as orderService from "./order.service.js";

export const createOrder = async (request, reply) => {
  const userId = request.user?.id;
  const { items } = request.body;
  return await orderService.placeOrder(userId, items);
};

export const getMyOrders = async (request, reply) => {
  const userId = request.user?.id;
  return await orderService.getUserOrders(userId);
};
