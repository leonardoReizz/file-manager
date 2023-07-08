const devUrl = "http://localhost:3333";
const prodUrl = "https://file-api.levipos.com.br";

export const ApiUrl =
  import.meta.env.VITE_NODE_ENV === "prod" ? prodUrl : devUrl;
