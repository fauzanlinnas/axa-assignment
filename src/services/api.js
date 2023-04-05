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

export const getUserDetail = (userId) => {
  return instance.get(`/users/${userId}`);
};

export const getUserAlbums = (userId) => {
  return instance.get(`/users/${userId}/albums`);
};

export const getAlbumDetail = (albumId) => {
  return instance.get(`/albums/${albumId}/photos`);
};

export const getPostDetail = (postId) => {
  return instance.get(`/posts/${postId}`);
};
export const getComments = (postId) => {
  return instance.get(`/posts/${postId}/comments`);
};

export const createPost = (payload) => {
  return instance.post("/posts", payload);
};
