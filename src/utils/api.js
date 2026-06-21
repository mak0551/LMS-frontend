import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4040",
  //   baseURL: "https://lms-htvh.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});