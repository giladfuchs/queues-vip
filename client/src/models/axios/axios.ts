import axios from "axios";

export const API = axios.create({
  // baseURL: "http://localhost:8080/",
  baseURL: "https://queue-jz36q4rkyq-uc.a.run.app",
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
