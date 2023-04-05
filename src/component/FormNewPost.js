import React, { useState } from "react";
import { createPost } from "../services/postsApi";

const FormNewPost = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createPost({ title, body });

      console.log("New post created:", response.data);
      onSuccess(response.data);
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          className="mt-1 mb-3 w-full px-3 py-2 rounded-lg shadow border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="body">Content</label>
        <textarea
          id="body"
          value={body}
          onChange={handleBodyChange}
          required
          className="mt-1 w-full px-3 py-2 rounded-lg shadow border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Create Post
      </button>
    </form>
  );
};

export default FormNewPost;
