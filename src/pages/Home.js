import React, { useEffect, useState } from "react";
import { getUsers } from "../services/api.js";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {users.map((val, i) => (
        <div className="flex items-center space-x-2">
          <p className="w-96">{val.name}</p>
          <Link to={`/users/${val.id}`}>See Posts</Link>
          <Link to={`/users/${val.id}/album-list`}>See Albums</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
