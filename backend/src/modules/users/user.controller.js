import * as userService from "./user.service.js";

export const getUser = async (request, reply) => {
  const user = await userService.getUserWrapper(request.params.id);
  return user;
};

export const getUsers = async (request, reply) => {
  const users = await userService.getAllUsersWrapper();
  return users;
};
