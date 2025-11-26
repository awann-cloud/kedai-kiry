import * as UserModel from "./user.model.js";

export const getAllUsers = () => {
  return UserModel.getAllUsers();
};

export const getUserById = (id) => {
  return UserModel.getUserById(id);
};

export const deleteUser = (id) => {
  return UserModel.deleteUser(id);
};

export const updateRole = (id, role) => {
  return UserModel.updateRole(id, role);
};
