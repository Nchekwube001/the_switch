import { useLoggedInStore } from "@/store/loginSlice";
import axios from "axios";
import config from "./config";
import { handleUnAuthenticatedError } from "./serviceUtils";

export const mainApi = axios.create({
  baseURL: config.baseUrl,
  timeout: 100000,
  headers: {
    common: {
      Accept: "*/*",
      channel: "MOBILE",
      "Content-Type": "application/json",
    },
  },
});

mainApi.interceptors.request.use((req) => {
  const { access_token } = useLoggedInStore.getState();
  if (access_token) {
    console.log({
      access_token,
    });

    req.headers.Authorization = `Bearer ${access_token}`;
  }
  return req;
});

mainApi.interceptors.response.use(
  (res) => res,
  (err) => handleUnAuthenticatedError(err)
);
