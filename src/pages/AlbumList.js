import React, { useState, useEffect } from "react";
import { getUserAlbums } from "../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";

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
        <button onClick={() => navigate(-1)}>{"< "}</button> Albums
      </h2>
      <ol className="list-decimal">
        {albums.map((album) => (
          <Link to={`/users/${id}/album-list/${album.id}`}>
            <li key={album.id} className="mb-2">
              {album.title}
            </li>
          </Link>
        ))}
      </ol>
    </div>
  );
};

export default AlbumList;
