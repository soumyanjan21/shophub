import bcrypt from "bcrypt";
import User from "../users/user.model.js";

const register = async ({ email, password }) => {
  const hash = await bcrypt.hash(password, 10);
  return User.create({ email, password: hash });
};  

const login = async ({ email, password }, fastify) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return {
    accessToken: fastify.jwt.sign({ id: user._id, role: user.role }),
  };
};
 
export default {
  register,
  login,
};