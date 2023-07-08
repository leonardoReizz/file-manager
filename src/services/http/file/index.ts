import { ApiUrl } from "@services/url";
import { apiDelete, get, post } from "@services/methods";
import { IDefaultApiResponse } from "@services/types";
import * as t from "./types";
import api from "@services/api";
import Cookies from "js-cookie";

async function list(): Promise<IDefaultApiResponse> {
  return get({ url: `${ApiUrl}/file/` });
}

async function createFolder(
  data: t.ICreateFolderData
): Promise<IDefaultApiResponse> {
  return post({ url: `${ApiUrl}/file/folder`, data });
}

async function deleteFolder(
  data: t.IDeleteFolderData
): Promise<IDefaultApiResponse> {
  return apiDelete({ url: `${ApiUrl}/file/folder/${data.folderId}` });
}

async function upload(data: t.IUploadFileData) {
  return await api
    .post(`${ApiUrl}/file/upload/${data.folderId}`, data.file, {
      headers: {
        Authorization: Cookies.get("leviFileToken"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((result) => {
      return { data: result.data, status: result.status } as any;
    })
    .catch((error) => {
      throw error;
    });
}

async function pinFolder(data: t.IPinFolder) {
  return post({ url: `${ApiUrl}/file/folder/pin/${data.folderId}` });
}

async function unpinFolder(data: t.IPinFolder) {
  return post({ url: `${ApiUrl}/file/folder/unpin/${data.folderId}` });
}

async function favoriteFile(
  data: t.IFavoriteFile
): Promise<IDefaultApiResponse> {
  return post({ url: `${ApiUrl}/file/folder`, data });
}

async function unfavoriteFile(
  data: t.IUnfavoriteFile
): Promise<IDefaultApiResponse> {
  return post({ url: `${ApiUrl}/file/folder`, data });
}

export default {
  list,
  createFolder,
  deleteFolder,
  upload,
  pinFolder,
  unpinFolder,
  favoriteFile,
  unfavoriteFile,
};
