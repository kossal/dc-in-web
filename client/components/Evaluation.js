import React from "react";
import { evaluate } from "../controllers/evaluation";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { round } from "../controllers/utils";
import "../styles/photo-upload.scss";

export default ({
  props: {
    photo,
    evaluation,
    setEvaluation,
  },
}) => {
  
  const displayEvaluation = ({ classification, score }) => (
    <Card className="mx-auto" style={{ width: '18rem' }}>
      <Card.Header>Results</Card.Header>
      <Card.Title className="text-center text-success mt-4" as="h2">
        {classification}
      </Card.Title>
      <Card.Subtitle className="text-center text-info mb-4" as="h4">
        Score: {round(score, 3)}
      </Card.Subtitle>
    </Card>
  );

  return (
    <Container className="mt-4" fluid>
      <Row className="mb-4">
        <Col>
          <label
            htmlFor="foto-upload"
            className="btn btn-block btn-primary btn-lg"
          >
            Change foto
          </label>
        </Col>
        <Col>
          <Button
            variant="success"
            size="lg"
            block
            onClick={() => evaluate(photo, setEvaluation)}
          >
            Evaluate
          </Button>
        </Col>
      </Row>

      {evaluation.classification && evaluation.score ? displayEvaluation(evaluation) : null}
    </Container>
  );
};
