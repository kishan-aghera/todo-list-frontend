import { Component, Fragment } from 'react'

export default class Unauthorized extends Component {
  constructor(props) {
    super(props);
  }

  printMessage() {
    <div>Please Login</div>  
  }

  redirectToHome() {
    setTimeout(() => {
      this.props.history.push("/")
    }, 2000);
  }
  
  render() {
    return (
      <Fragment>
        {this.printMessage && this.redirectToHome}
      </Fragment>
    )
  }
}
