import { post, get, put } from "@services/methods";
import { ApiUrl } from "@services/url";
import * as t from "./types";
import { DefaultApiResponse } from "@services/types";

async function createUser(data: t.CreateUserData): Promise<DefaultApiResponse> {
  return post({ url: `${ApiUrl}/user`, data });
}

async function getUser(): Promise<DefaultApiResponse> {
  const getUser = await get({
    url: `${ApiUrl}/user`,
  });

  return getUser;
}

async function updateUser(
  data: t.UpdateUserData
): Promise<DefaultApiResponse> {
  return put({
    url: `${ApiUrl}/user`,
    data,
  });
}

async function changePassword(
  data: t.ChangePasswordData
): Promise<DefaultApiResponse> {
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
