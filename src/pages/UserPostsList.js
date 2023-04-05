import React, { useEffect, useState } from "react";
import { deletePostApi, getUserDetail, getUserPosts } from "../services/api.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormNewPost from "../component/FormNewPost.js";
import Modal from "../component/Modal.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  deletePost,
  initPost,
} from "../store/actions/postsActions.js";

const UserPostsList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const [userResponse, postsResponse] = await Promise.all([
          getUserDetail(id),
          getUserPosts(id),
        ]);

        setUser(userResponse.data);
        dispatch(initPost(postsResponse.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserAndPosts();
  }, [id, dispatch]);

  const handleOnSuccess = (payload) => {
    dispatch(addPost(payload));

    setIsFormOpen(false);
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePostApi(postId);
      dispatch(deletePost(postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">
          <button onClick={() => navigate(-1)}>{"< "}</button> Posts by{" "}
          {user?.name}
        </h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add New Post
        </button>
      </div>
      <ol className="list-decimal">
        {posts.map((post, i) => (
          <li key={i} className="mb-4">
            <div className="flex items-center justify-between">
              <Link to={`/post/${post.id}`}>
                <h4 className="font-semibold text-lg">{post.title}</h4>
              </Link>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete post
              </button>
            </div>
          </li>
        ))}
      </ol>
      <Modal
        isOpen={isFormOpen}
        title="Add New Post"
        onClose={() => setIsFormOpen(false)}
      >
        <FormNewPost onSuccess={(payload) => handleOnSuccess(payload)} />
      </Modal>
    </div>
  );
};

export default UserPostsList;
