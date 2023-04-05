import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserAlbums } from "../services/usersApi";

const AlbumList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await getUserAlbums(id);
        setAlbums(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbums();
  }, [id]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">
        <button onClick={() => navigate(-1)}>{"<"}</button> Albums
      </h2>
      <ol className="list-decimal">
        {albums.map((album) => (
          <Link key={album.id} to={`/users/${id}/album-list/${album.id}`}>
            <li className="mb-2 hover:underline font-semibold text-lg">
              {album.title}
            </li>
          </Link>
        ))}
      </ol>
    </div>
  );
};

export default AlbumList;
