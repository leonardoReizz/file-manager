import { post, get } from "@services/methods";
import { ApiUrl } from "@services/url";
import * as t from "./types";
import { IDefaultApiResponse } from "@services/types";

async function createUser(
  data: t.CreateUserData
): Promise<IDefaultApiResponse> {
  return post({ url: `${ApiUrl}/user`, data });
}

// async function passwordRecover(email: string): Promise<IDefaultApiResponse> {
//   return await get({
//     url: `${ApiUrl}/user/passwrecover`,
//     params: {
//       email,
//     },
//   });
// }

// async function passwordChange(data: t.PasswordChangeData): Promise<any> {
//   const changePassword = await put({
//     url: `${ApiUrl.USER}/user/passwrecover`,
//     data,
//   });

//   return changePassword;
// }

async function getUser(): Promise<IDefaultApiResponse> {
  const getUser = await get({
    url: `${ApiUrl}/user`,
  });

  return getUser;
}

export default {
  createUser,
  getUser,
};
