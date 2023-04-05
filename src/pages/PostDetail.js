import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../component/Modal";
import FormNewComment from "../component/FormNewComment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
  editComment,
  initComment,
} from "../store/actions/commentsActions";
import { getPostDetail } from "../services/postsApi";
import { deleteCommentApi, getComments } from "../services/commentApi";
import FormNewPost from "../component/FormNewPost";
import { editPost } from "../store/actions/postsActions";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);

  const [post, setPost] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);
  const [editCommentData, setEditCommentData] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

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

  const handleOnEditCommentSuccess = (payload) => {
    dispatch(editComment(payload));

    setIsFormOpen(false);
  };

  const handleOnEditSuccess = (payload) => {
    setPost(payload);
    dispatch(editPost(payload));

    setIsEditFormOpen(false);
  };

  return (
    <div>
      <div className="mb-4 flex items-center space-x-3">
        <h2 className="mb-1 text-2xl font-semibold">
          <button onClick={() => navigate(-1)}>{"< "}</button> Back
        </h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => setIsEditFormOpen(true)}
        >
          Edit Post
        </button>
      </div>

      {post && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="whitespace-pre-wrap">{post.body}</p>
        </div>
      )}

      <div className="flex items-center mb-3">
        <h3 className="text-lg font-bold">Comments</h3>
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
            <button
              onClick={() => {
                setIsEditComment(true);
                setIsFormOpen(true);
                setEditCommentData(comment);
              }}
              className=" text-blue-600 font-bold ml-2"
            >
              Edit comment
            </button>
          </div>
          <p className="whitespace-pre-wrap">{comment.body}</p>
        </div>
      ))}
      <Modal
        isOpen={isFormOpen}
        title={isEditComment ? "Edit Comment" : "Add New Comment"}
        onClose={() => setIsFormOpen(false)}
      >
        <FormNewComment
          onSuccess={
            isEditComment
              ? (payload) => handleOnEditCommentSuccess(payload)
              : (payload) => handleOnSuccess(payload)
          }
          postId={id}
          isEdit={isEditComment}
          commentData={editCommentData}
        />
      </Modal>
      <Modal
        isOpen={isEditFormOpen}
        title="Edit Post"
        onClose={() => setIsEditFormOpen(false)}
      >
        <FormNewPost
          onSuccess={(payload) => handleOnEditSuccess(payload)}
          isEdit={true}
          postData={post}
        />
      </Modal>
    </div>
  );
};

export default PostDetail;
