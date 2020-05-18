import React from "react";
import {handleFotoUpload} from "../controllers/photo";
import { Container, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "../styles/photo-upload.scss";

export default ({ props: { photo, setFile } }) => {

  const displayUploadFoto = (handleFotoUpload) => (
    <div>
      <div>
        <FontAwesomeIcon
          className="photo-upload__icon mx-auto mb-4"
          icon={faUpload}
          size="4x"
        />
        <label htmlFor="foto-upload" className="btn btn-primary">
          Upload foto
        </label>
      </div>
    </div>
  );

  const displayFoto = photo => <img src={photo} className="photo-upload__photo" id="photo" />


  return (
    <Container className="rounded bg-white photo-upload mt-5 p-3" fluid>
      <input
          className="photo-upload__input"
          name="foto-upload"
          type="file"
          accept="image/*"
          capture="camera"
          id="foto-upload"
          onChange={e => handleFotoUpload(e, setFile)}
        />
      {photo ? displayFoto(photo) : displayUploadFoto(handleFotoUpload)}
    </Container>
  );
};
