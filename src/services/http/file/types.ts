import { ExtensionType } from "@components/FileIcon";

export interface File {
  file: string;
  favorited: boolean;
  fileId: string;
  fileName: string;
  extension: ExtensionType;
}

export interface Folder {
  folder: string;
  folderName: string;
  pinned: boolean;
  folderId: string;
  files: File[];
}

export interface CreateFolderData {
  name: string;
}

export interface DeleteFolderData {
  folderId: string;
}

export interface UploadFileData {
  file: FormData;
  folderId: string;
}

export interface PinFolder {
  folderId: string;
}

export interface FavoriteFile {
  fileId: string;
  folderId: string;
}

export interface UnfavoriteFile {
  fileId: string;
  folderId: string;
}

export interface DeleteFile {
  fileId: string;
  folderId: string;
}
