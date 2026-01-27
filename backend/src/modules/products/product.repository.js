import Product from "./product.model.js";

export default {
  findAll: async () => Product.find().lean(),

  create: async (data) => Product.create(data),

  findById: async (id) => Product.findById(id),
};
