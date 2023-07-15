export interface DefaultApiResponse {
  data: {
    message: any;
    [key: string]: any;
  };
  status: number;
}

export interface ApiDelete {
  data?: any;
  url: string;
  params?: any;
}
