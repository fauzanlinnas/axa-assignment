import React, { useState } from "react";
import { addCommentApi } from "../services/commentApi";

const FormNewComment = ({ onSuccess, postId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await addCommentApi({
        postId,
        body: comment,
        name: "Fauzan Linnas",
        email: "fauzanlinnas@gmail.com",
      });

      onSuccess(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          id="body"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="mt-1 w-full px-3 py-2 rounded-lg shadow border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Comment
      </button>
    </form>
  );
};

export default FormNewComment;
