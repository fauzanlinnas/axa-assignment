import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../component/Modal";
import FormNewComment from "../component/FormNewComment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
  initComment,
} from "../store/actions/commentsActions";
import { getPostDetail } from "../services/postsApi";
import { deleteCommentApi, getComments } from "../services/commentApi";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);

  const [post, setPost] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [userResponse, postsResponse] = await Promise.all([
          getPostDetail(id),
          getComments(id),
        ]);

        setPost(userResponse.data);
        dispatch(initComment(postsResponse.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostAndComments();
  }, [id, dispatch]);

  const handleDeleteComment = async (commentId) => {
    await deleteCommentApi(commentId);

    dispatch(deleteComment(commentId));
  };

  const handleOnSuccess = (payload) => {
    dispatch(addComment(payload));

    setIsFormOpen(false);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">
        <button onClick={() => navigate(-1)}>{"< "}</button> Back
      </h2>

      {post && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p>{post.body}</p>
        </div>
      )}

      <div className="flex items-center mb-3">
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        <button
          onClick={() => setIsFormOpen(true)}
          className="ml-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add New Comment
        </button>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <div className="flex items-center">
            <h4 className="font-semibold">
              {comment.name} ({comment.email})
            </h4>
            <button
              onClick={() => handleDeleteComment(comment.id)}
              className=" text-red-600 font-bold ml-2"
            >
              Delete comment
            </button>
          </div>
          <p>{comment.body}</p>
        </div>
      ))}
      <Modal
        isOpen={isFormOpen}
        title="Add New Comment"
        onClose={() => setIsFormOpen(false)}
      >
        <FormNewComment
          onSuccess={(payload) => handleOnSuccess(payload)}
          postId={id}
        />
      </Modal>
    </div>
  );
};

export default PostDetail;
