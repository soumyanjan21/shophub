import service from "./product.service.js";

export default {
  getAll: async () => service.getAll(),
  create: async (req) => service.create(req.body),
};
