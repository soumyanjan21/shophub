import Cart from "./cart.model.js";

export const findCartByUserId = async (userId) => {
  return await Cart.findOne({ user: userId }).populate("items.product");
};

export const createCart = async (userId) => {
  return await Cart.create({ user: userId, items: [] });
};

export const updateCart = async (userId, items) => {
  return await Cart.findOneAndUpdate(
    { user: userId },
    { items },
    { new: true, upsert: true },
  ).populate("items.product");
};

export const clearCart = async (userId) => {
  return await Cart.findOneAndUpdate(
    { user: userId },
    { items: [] },
    { new: true },
  );
};
