import * as userRepository from "./user.repository.js";

export const getUserWrapper = async (id) => {
  return await userRepository.findUserById(id);
};

export const getAllUsersWrapper = async () => {
  return await userRepository.findAllUsers();
};
