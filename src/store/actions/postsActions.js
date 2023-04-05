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
