import React, {Fragment} from "react";
import Main from './components/Main';
import { Container } from "react-bootstrap";
import "./styles/background.scss";

export default () => {

  return (
    <Fragment>
      
      <div className="background__gradient"></div>
        
      <h1 className="text-center my-5">
        Dogs and Cats Classification Demo
      </h1>

      <Main />

    </Fragment>

  );
};
