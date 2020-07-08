import axios from "axios";
import { baseURL } from "../../App";
export const API = axios.create({
  baseURL: "http://localhost:8080/",
  // baseURL: "https://34.69.25.108/",

  headers: {
    "Access-Control-Allow-Origin": false,
  },
});

API.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) config.headers["token"] = "" + token;

    const domain = "" + localStorage.getItem("domain");
    if (domain) config.headers["domain"] = "" + domain;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
