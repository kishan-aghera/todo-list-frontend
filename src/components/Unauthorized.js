import { Link } from 'react-router-dom';
import { 
  Alert, 
  Container 
} from 'reactstrap';

const Unauthorized = () => {
  return (
    <Container>
      <Alert color="danger">
        Please Login and then you can use this feature.
        <br />
        You can get Login or Register by visiting the following link.
        <br />
        <Link to="/todo-list-frontend">Home</Link>
      </Alert>
    </Container>
  )
};

export default Unauthorized;
