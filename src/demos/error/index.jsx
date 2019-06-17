import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  //捕捉错误和错误上报程序库一起使用
  componentDidCatch(err, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong!</div>;
    }
    return this.props.children;
  }
}
class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {  };
    }
    render() {
      return <span>用户名：{this.state.user.push(1)}</span>
    }
  }

class Greeting extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Profile/>
      </ErrorBoundary>
    );
  }
}
export default Greeting;
