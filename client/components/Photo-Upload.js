import React from "react";
import { handlePhotoPreview } from "../controllers/photo";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/photo-upload.scss";

export default ({ props: { photo, setFile } }) => {
  
  const displayUploadFoto = () => (
    <div className="photo-upload__display-upload">
      <div>
        <FontAwesomeIcon
          className="photo-upload__icon mx-auto mb-4"
          icon="upload"
          size="4x"
        />
        <label htmlFor="foto-upload" className="btn btn-primary">
          Upload foto
        </label>
      </div>
    </div>
  );

  const displayFoto = (photo) => <img src={photo} className="photo-upload__photo" id="photo" />;

  return (
    <Container className="rounded bg-white photo-upload mt-5 p-3" fluid>
      <input
        className="photo-upload__input"
        name="foto-upload"
        type="file"
        accept="image/*"
        capture="camera"
        id="foto-upload"
        onChange={(e) => handlePhotoPreview(e, setFile)}
      />
      {photo
        ? displayFoto(photo)
        : displayUploadFoto()}

    </Container>
  );
};
