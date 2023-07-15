import { ApiUrl } from "@services/url";
import { apiDelete, get, post, put } from "@services/methods";
import { DefaultApiResponse } from "@services/types";
import * as t from "./types";
import api from "@services/api";
import Cookies from "js-cookie";

async function list(): Promise<DefaultApiResponse> {
  return get({ url: `${ApiUrl}/file/` });
}

async function createFolder(
  data: t.CreateFolderData
): Promise<DefaultApiResponse> {
  return post({ url: `${ApiUrl}/folder`, data });
}

async function deleteFolder(
  data: t.DeleteFolderData
): Promise<DefaultApiResponse> {
  return apiDelete({ url: `${ApiUrl}/folder/${data.folderId}` });
}

async function upload(data: t.UploadFileData) {
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

async function pinFolder(data: t.PinFolder) {
  return post({ url: `${ApiUrl}/folder/pin/${data.folderId}` });
}

async function unpinFolder(data: t.PinFolder) {
  return post({ url: `${ApiUrl}/folder/unpin/${data.folderId}` });
}

async function favoriteFile(
  data: t.FavoriteFile
): Promise<DefaultApiResponse> {
  return put({
    url: `${ApiUrl}/file/favorite/${data.folderId}/${data.fileId}`,
    data,
  });
}

async function unfavoriteFile(
  data: t.UnfavoriteFile
): Promise<DefaultApiResponse> {
  return put({
    url: `${ApiUrl}/file/unfavorite/${data.folderId}/${data.fileId}`,
    data,
  });
}

async function deleteFile(data: t.DeleteFile): Promise<DefaultApiResponse> {
  return apiDelete({
    url: `${ApiUrl}/file/${data.folderId}/${data.fileId}`,
    data,
  });
}

export default {
  list,
  deleteFile,
  createFolder,
  deleteFolder,
  upload,
  pinFolder,
  unpinFolder,
  favoriteFile,
  unfavoriteFile,
};
