import React, { useEffect, useState } from "react";
import { getUserDetail, getUserPosts } from "../services/api.js";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserPostsList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        <button onClick={() => navigate(-1)}>{"< "}</button> Posts by{" "}
        {user?.name}
      </h2>
      <ol className="list-decimal">
        {posts.map((post) => (
          <li key={post.id} className="mb-4">
            <Link to={`/post/${post.id}`}>
              <h4 className="font-semibold text-lg">{post.title}</h4>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UserPostsList;
