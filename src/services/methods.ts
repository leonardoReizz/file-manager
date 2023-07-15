import api from "@services/api";
import Cookies from "js-cookie";
import { DefaultApiResponse } from "./types";

interface AxiosData {
  url: string;
  data?: any;
  params?: any;
}

export async function get({ url, data, params }: AxiosData) {
  return await api
    .get(url, {
      data,
      params,
      headers: {
        Authorization: Cookies.get("leviFileToken"),
      },
    })
    .then((result) => {
      return { data: result.data, status: result.status } as any;
    })
    .catch((error) => {
      throw error;
    });
}

export async function post({
  url,
  data,
}: Omit<AxiosData, "params">): Promise<DefaultApiResponse> {
  return await api
    .post(url, data, {
      headers: {
        Authorization: Cookies.get("leviFileToken"),
      },
    })
    .then((result) => {
      return { data: result.data, status: result.status } as any;
    })
    .catch((error) => {
      throw error;
    });
}

export async function put({ url, data }: Omit<AxiosData, "params">) {
  return api
    .put(url, data, {
      headers: {
        Authorization: Cookies.get("leviFileToken"),
      },
    })
    .then((result) => {
      return { data: result.data, status: result.status } as any;
    })
    .catch((error) => {
      throw error;
    });
}

export async function apiDelete({ url, data, params }: AxiosData) {
  return api
    .delete(url, {
      data,
      params,
      headers: {
        Authorization: Cookies.get("leviFileToken"),
      },
    })
    .then((result) => {
      return { data: result.data, status: result.status } as any;
    })
    .catch((error) => {
      throw error;
    });
}
