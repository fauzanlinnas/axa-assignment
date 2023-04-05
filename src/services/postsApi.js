import api from "./api";

export const getUserPosts = (userId) => {
  return api.get(`/posts?userId=${userId}`);
};

export const getPostDetail = (postId) => {
  return api.get(`/posts/${postId}`);
};

export const createPost = (payload) => {
  return api.post("/posts", payload);
};

export const deletePostApi = (postId) => {
  return api.delete(`/posts/${postId}`);
};
