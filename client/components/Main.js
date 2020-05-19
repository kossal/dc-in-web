import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Photo_Upload from "./Photo-Upload";
import Evaluation from "./Evaluation";

export default () => {
  const [file, setFile] = useState({file: null, photo: null});
  const [evaluation, setEvaluation] = useState({classification: null, score: null});

  return (
    <Container className="bg-light shadow-lg px-3 py-4 mb-5 rounded">
      <h2 className="mb-3">Welcome!</h2>

      <p>
        This demo uses a{" "}
        <a
          href="https://towardsdatascience.com/a-comprehensive-guide-to-convolutional-neural-networks-the-eli5-way-3bd2b1164a53"
          className="text-success"
          target="_blank"
        >
          convolutional neural network
        </a>{" "}
        to classify a picture as <i>more likely</i> to be a <b>dog</b> or a{" "}
        <b>cat</b>.
      </p>

      <p>
        To test it just upload a picture and press <b>Evaluate</b>:
      </p>

      <Photo_Upload className="my-5" props={{ photo: file.photo, setFile }} />

      {file.photo ? <Evaluation props={{ file: file.file, evaluation, setEvaluation }}/> : null}

    </Container>
  );
};
