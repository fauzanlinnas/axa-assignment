import React, { useEffect, useState } from "react";
import { getUserDetail, getUserPosts } from "../services/api.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormNewPost from "../component/FormNewPost.js";
import Modal from "../component/Modal.js";

const UserPostsList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const [userResponse, postsResponse] = await Promise.all([
          getUserDetail(id),
          getUserPosts(id),
        ]);

        setUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserAndPosts();
  }, [id]);

  const handleOnSuccess = (payload) => {
    setPosts((oldList) => [...oldList, payload]);

    setIsFormOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
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
        {posts.map((post) => (
          <li key={post.id} className="mb-4">
            <Link to={`/post/${post.id}`}>
              <h4 className="font-semibold text-lg">{post.title}</h4>
            </Link>
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
