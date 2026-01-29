import User from "./user.model.js";

export default {
  create: async (data) => User.create(data),

  findByEmail: async (email) => User.findOne({ email }),

  findById: async (id) => User.findById(id),
};
