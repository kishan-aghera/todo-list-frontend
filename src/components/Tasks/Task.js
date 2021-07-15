import { 
  Button, 
  Container, 
  Card, 
  Row, 
  Col, 
  CardText 
} from 'reactstrap';

const Task = (props) => {
  const styles = {
    padding: "7px", 
    margin: "7px 0"
  };

  return (
    <Container>
      <Card>
        <Row>
          <Col xs="6">
            <CardText
              tag="h5"
              style={styles}
            >
              {props.name}
            </CardText>
          </Col>
          
          <Col>
            <Button
              color="secondary"
              style={styles}
              onClick={() => props.updateHandler(props.id, props.name, props.user_id, props.i)} // [TaskItem.js 76]
            >
              Update
            </Button>
          </Col>
          
          <Col>
            <Button
              color="danger"
              style={styles}
              onClick={() => props.deleteHandler(props.id, props.i)} // [TaskItem.js 98]
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default Task;
