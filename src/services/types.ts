export interface IDefaultApiResponse {
  data: {
    message: any;
    [key: string]: any;
  };
  status: number;
}

export interface IApiDelete {
  data?: any;
  url: string;
  params?: any;
}
