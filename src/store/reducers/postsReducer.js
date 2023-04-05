const initialState = {
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_POST":
      return {
        ...state,
        posts: action.payload,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "DELETE_POST":
      const updatedPosts = state.posts.filter(
        (post) => post.id !== action.payload
      );

      return {
        ...state,
        posts: updatedPosts,
      };
    default:
      return state;
  }
};

export default postsReducer;
