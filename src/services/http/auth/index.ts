import * as t from "./types";
import { ApiUrl } from "@services/url";
import { post } from "@services/methods";
import { IDefaultApiResponse } from "@services/types";
import Cookies from "js-cookie";
import api from "@services/api";

async function signIn(data: t.AuthLoginData): Promise<IDefaultApiResponse> {
  return post({ url: `${ApiUrl}/authenticate/`, data });
}

async function refreshToken() {
  return api
    .post(
      `${ApiUrl}/authenticate/refresh`,
      {},
      {
        headers: {
          Authorization: Cookies.get("leviFileRefresh"),
        },
      }
    )
    .then((result) => {
      return { data: result.data, status: result.status } as any;
    })
    .catch((error) => {
      throw error;
    });
}

export default { signIn, refreshToken };
