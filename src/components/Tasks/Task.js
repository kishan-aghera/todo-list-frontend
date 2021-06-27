import React from 'react';
import { Button, Container, Card, Row, Col, CardText } from 'reactstrap';

export default function Task(props) {
  return (
    <Container>
      <Card>
        <Row>
          <Col xs="6">
            <CardText
              tag="h5"
              style={{ padding: "7px", margin: "7px 0" }}
            >
              {props.name}
            </CardText>
          </Col>
          <Col>
            <Button
              color="secondary"
              style={{ padding: "7px", margin: "7px 0" }}
              onClick={() => props.updateHandler(props.id, props.name, props.user_id)}
            >
              Update
            </Button>
          </Col>
          <Col>
            <Button
              color="danger"
              style={{ padding: "7px", margin: "7px 0" }}
              onClick={() => props.deleteHandler(props.id, props.i)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}
