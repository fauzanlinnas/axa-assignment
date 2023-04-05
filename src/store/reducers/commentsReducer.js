const initialState = {
  comments: [],
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_COMMENT":
      return {
        ...state,
        comments: action.payload,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "DELETE_COMMENT":
      const updatedComments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );

      return {
        ...state,
        comments: updatedComments,
      };
    default:
      return state;
  }
};

export default commentsReducer;
