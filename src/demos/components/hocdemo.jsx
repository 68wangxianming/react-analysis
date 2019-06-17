//高阶组件就是一个没有副作用的纯函数。
import React, { Component } from "react";
//高阶组件之前的代码
// class Welcome extends Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//           username: ''
//       }
//   }

//   componentWillMount() {
//       let username = localStorage.getItem('username');
//       this.setState({
//           username: username
//       })
//   }

//   render() {
//       return (
//           <div>welcome {this.state.username}</div>
//       )
//   }
// }
// class Goodbye extends Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//           username: ''
//       }
//   }

//   componentWillMount() {
//       let username = localStorage.getItem('username');
//       this.setState({
//           username: username
//       })
//   }

//   render() {
//       return (
//           <div>goodbye {this.state.username}</div>
//       )
//   }
// }
//##高阶组件之后的代码
//注值 localStorage.username = "老袁"
const wrapWithUsername = WrappedComponent => {
  class NewComponent extends Component {
    constructor() {
      super();
      this.state = {
        username: ""
      };
    }
    componentWillMount() {
      let username = localStorage.getItem("username");
      this.setState({
        username: username
      });
    }

    render() {
      return <WrappedComponent username={this.state.username} />;
    }
  }

  return NewComponent;
};
class Welcome extends Component {
  render() {
    return <div className="text-warning">welcome {this.props.username}</div>;
  }
}
//升级高阶组件
Welcome = wrapWithUsername(Welcome);

class Goodbye extends Component {
  render() {
    return <div className="text-info">goodbye {this.props.username}</div>;
  }
}
//升级高阶组件
Goodbye = wrapWithUsername(Goodbye);
class Greeting extends Component {
  render() {
    return (
      <>
        <Welcome /> <Goodbye />
      </>
    );
  }
}
export default Greeting;
