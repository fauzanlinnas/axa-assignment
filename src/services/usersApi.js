import api from "./api";

export const getUsers = () => {
  return api.get("/users");
};

export const getUserDetail = (userId) => {
  return api.get(`/users/${userId}`);
};

export const getUserAlbums = (userId) => {
  return api.get(`/users/${userId}/albums`);
};

export const getAlbumDetail = (albumId) => {
  return api.get(`/albums/${albumId}/photos`);
};
