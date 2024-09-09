import User from "../models/User";

export const findUser = (filter: { email?: string; _id?: string }) =>
  User.findOne(filter);

export const updateUser = (
  filter: { _id: string },
  data: { username?: string; email?: string; password?: string; token?: string }
) => User.findOneAndUpdate(filter, data);

export const signup = (data: {
  username: string;
  email: string;
  password: string;
}) => User.create(data);
