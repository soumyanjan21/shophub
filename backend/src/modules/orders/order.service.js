import * as orderRepository from "./order.repository.js";
import Product from "../products/product.model.js";

export const placeOrder = async (userId, items) => {
  let total = 0;

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product ${product.name}`);
    }

    total += product.price * item.quantity;
  }

  const orderData = {
    user: userId,
    items: items.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    })),
    total,
  };

  return await orderRepository.createOrder(orderData);
};

export const getUserOrders = async (userId) => {
  return await orderRepository.findOrdersByUser(userId);
};
