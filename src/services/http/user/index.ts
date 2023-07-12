import { post, get, put } from "@services/methods";
import { ApiUrl } from "@services/url";
import * as t from "./types";
import { IDefaultApiResponse } from "@services/types";

async function createUser(
  data: t.CreateUserData
): Promise<IDefaultApiResponse> {
  return post({ url: `${ApiUrl}/user`, data });
}

async function getUser(): Promise<IDefaultApiResponse> {
  const getUser = await get({
    url: `${ApiUrl}/user`,
  });

  return getUser;
}

async function updateUser(
  data: t.IUpdateUserData
): Promise<IDefaultApiResponse> {
  return put({
    url: `${ApiUrl}/user`,
    data,
  });
}

async function changePassword(
  data: t.IChangePasswordData
): Promise<IDefaultApiResponse> {
  return put({
    url: `${ApiUrl}/user/changePassword`,
    data,
  });
}

export default {
  createUser,
  getUser,
  updateUser,
  changePassword,
};
