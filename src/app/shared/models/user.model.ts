import {RoleType} from "../enum/roleType.enum";

export class UserModel {
  userId?: string;
  username?: string;
  email?: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
  imageUrl?: string;
  role?: RoleType;
}
