import React, { useState, useEffect } from "react";
import { getComments, getPostDetail } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [userResponse, postsResponse] = await Promise.all([
          getPostDetail(id),
          getComments(id),
        ]);

        setPost(userResponse.data);
        setComments(postsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostAndComments();
  }, [id]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">
        <button onClick={() => navigate(-1)}>{"< "}</button> Back
      </h2>

      {post && (
        <div>
          <h2 className="text-xl font-bold mb-4">{post.title}</h2>
          <p className="mb-4">{post.body}</p>
        </div>
      )}

      <h3 className="text-lg font-bold mb-2">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <h4 className="font-semibold">
            {comment.name} ({comment.email})
          </h4>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
