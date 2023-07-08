export interface CreateUserData {
  email: string;
  fullName: string;
  password: string;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
