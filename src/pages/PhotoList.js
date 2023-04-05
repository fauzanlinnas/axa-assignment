import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../component/Modal";
import { getAlbumDetail } from "../services/usersApi";

const PhotoList = () => {
  const navigate = useNavigate();
  const { albumId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [isSeePhoto, setIsSeePhoto] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await getAlbumDetail(albumId);
        setPhotos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotos();
  }, [albumId]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">
        <button onClick={() => navigate(-1)}>{"<"}</button> Photos
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => {
              setIsSeePhoto(true);
              setActivePhoto(photo);
            }}
            className="cursor-pointer"
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="max-w-full h-auto"
            />
            <p className="mt-2">{photo.title}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isSeePhoto}
        title={activePhoto?.title}
        onClose={() => setIsSeePhoto(false)}
      >
        <img
          src={activePhoto.thumbnailUrl}
          alt={activePhoto.title}
          className="max-w-full h-auto m-auto"
        />
      </Modal>
    </div>
  );
};

export default PhotoList;
