import User from "../models/User";

export const findUser = (filter: { _id: string }) => User.findOne(filter);

export const updateUser = (
  filter: { id: string },
  data: { username?: string; email?: string; password?: string }
) => User.findOneAndUpdate(filter, data);

export const signup = (data: {
  username: string;
  email: string;
  password: string;
}) => User.create(data);
