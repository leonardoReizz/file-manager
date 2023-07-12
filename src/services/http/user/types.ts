export interface CreateUserData {
  email: string;
  fullName: string;
  password: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateUserData {
  email?: string;
  fullName?: string;
  id: string;
}

export interface IChangePasswordData {
  currentPassword: string;
  newPassword: string;
}
