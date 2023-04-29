import { UserModel } from "../models/user.model";

export interface LoginResponse {
  token: string;
  type: string;
  user: UserModel;
}
