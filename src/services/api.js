import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = () => {
  return instance.get("/users");
};

export const getUserPosts = (userId) => {
  return instance.get(`/posts?userId=${userId}`);
};
