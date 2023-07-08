export interface IFile {
  folder: string;
  folderName: string;
  pinned: boolean;
  folderId: string;
  files: {
    file: string;
    favorited: boolean;
    fileId: string;
    fileName: string;
    extension: string;
  }[];
}

export interface ICreateFolderData {
  name: string;
}

export interface IDeleteFolderData {
  folderId: string;
}

export interface IUploadFileData {
  file: FormData;
  folderId: string;
}

export interface IPinFolder {
  folderId: string;
}

export interface IFavoriteFile {
  fileId: string;
  folderId: string;
}

export interface IUnfavoriteFile {
  fileId: string;
  folderId: string;
}
