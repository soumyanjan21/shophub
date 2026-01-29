import AuthService from "./auth.service.js";

const register = async (req, reply) => {
  const user = await AuthService.register(req.body);
  reply.code(201).send(user);
};

const login = async (req, reply) => {
  const token = await AuthService.login(req.body, req.server);
  reply.send(token);
};

export default {
  register,
  login,
};
