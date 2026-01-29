import * as cartRepository from "./cart.repository.js";
import Product from "../products/product.model.js";

export const getCart = async (userId) => {
  let cart = await cartRepository.findCartByUserId(userId);
  if (!cart) {
    cart = await cartRepository.createCart(userId);
  }
  return cart;
};

export const addToCart = async (userId, productId, quantity) => {
  const cart = await getCart(userId);
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const existingItemIndex = cart.items.findIndex(
    (item) =>
      item.product._id.toString() === productId ||
      item.product.toString() === productId,
  );

  let newItems = [...cart.items];

  if (existingItemIndex > -1) {
    newItems[existingItemIndex].quantity += quantity;
  } else {
    newItems.push({ product: productId, quantity });
  }

  return await cartRepository.updateCart(userId, newItems);
};

export const removeFromCart = async (userId, productId) => {
  const cart = await getCart(userId);
  const newItems = cart.items.filter(
    (item) =>
      item.product._id.toString() !== productId &&
      item.product.toString() !== productId,
  );
  return await cartRepository.updateCart(userId, newItems);
};
