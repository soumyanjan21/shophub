import User from "./user.model.js";

export default {
  // Method needed by auth.service.js
  create: async (data) => User.create(data),

  // Method needed by auth.service.js
  findByEmail: async (email) => User.findOne({ email }),

  findById: async (id) => User.findById(id),
};
