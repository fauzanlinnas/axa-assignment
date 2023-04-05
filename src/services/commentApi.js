import api from "./api";

export const getComments = (postId) => {
  return api.get(`/posts/${postId}/comments`);
};

export const addCommentApi = (payload) => {
  return api.post(`/comments`, payload);
};

export const deleteCommentApi = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};
