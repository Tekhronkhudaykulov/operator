import i18n from "../../i18n";
// @ts-ignore
import { getLoginJson, loginToFile } from "../../electron/helper/filehelper";

const loginData = getLoginJson();
const loginParse = loginData && JSON.parse(loginData);

import axios from "axios";

export const $api = axios.create({
  baseURL: loginParse?.ip,
});

$api.defaults.headers.common["Accept"] = "application/json";

export const initApp = () => {
  // const token = window.localStorage.getItem("token");
  const token = loginParse?.token;
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
  loginToFile({
    ...loginParse,
    token: token,
  });
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getToken = () => {
  const token = window.localStorage.getItem("token");
  return token;
};

// Language
$api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18n.language.toLowerCase();
  return config;
});

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  $api.defaults.headers.common["Accept-Language"] = lng;
};
