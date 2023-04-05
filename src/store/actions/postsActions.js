export const initPost = (post) => {
  return {
    type: "INIT_POST",
    payload: post,
  };
};

export const addPost = (post) => {
  return {
    type: "ADD_POST",
    payload: post,
  };
};

export const deletePost = (id) => {
  return {
    type: "DELETE_POST",
    payload: id,
  };
};

export const editPost = (post) => {
  return {
    type: "EDIT_POST",
    payload: post,
  };
};
