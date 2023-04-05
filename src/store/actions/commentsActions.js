export const initComment = (comment) => {
  return {
    type: "INIT_COMMENT",
    payload: comment,
  };
};

export const addComment = (comment) => {
  return {
    type: "ADD_COMMENT",
    payload: comment,
  };
};

export const deleteComment = (id) => {
  return {
    type: "DELETE_COMMENT",
    payload: id,
  };
};
