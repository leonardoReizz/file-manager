export interface CreateUserData {
  email: string;
  fullName: string;
  password: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserData {
  email?: string;
  fullName?: string;
  id: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}
