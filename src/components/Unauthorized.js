import { Fragment , Link } from 'react';
import { Alert } from 'reactstrap';

const Unauthorized = () => {
  return (
    <Fragment>
      <Alert color="danger">
        Please Login and then you can use this feature.
        <br />
        You can get Login or Register by visiting the following link.
        <br />
        <Link to="/">Home</Link>
      </Alert>
    </Fragment>
  )
};

export default Unauthorized;
