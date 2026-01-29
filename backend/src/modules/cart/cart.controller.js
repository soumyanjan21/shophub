import * as cartService from "./cart.service.js";

const getCart = async (req, reply) => {
  const userId = req.user.id;
  const cart = await cartService.getCart(userId);
  return cart;
};

const addItem = async (req, reply) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;
  const cart = await cartService.addToCart(userId, productId, quantity);
  return cart;
};

const removeItem = async (req, reply) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const cart = await cartService.removeFromCart(userId, productId);
  return cart;
};

export default {
  getCart,
  addItem,
  removeItem,
};
