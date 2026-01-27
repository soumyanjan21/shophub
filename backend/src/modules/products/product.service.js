import repo from "./product.repository.js";

export default {
  getAll: () => repo.findAll(),
  create: (data) => repo.create(data),
};
