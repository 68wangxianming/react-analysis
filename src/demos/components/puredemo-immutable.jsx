import React from "react";
const { List } = require("immutable");
// let data = [];
//创建不可变的对象✅
let data = List(["start"]);
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: data
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextState", nextState);
    console.log("this.state", this.state);
    if (this.props.color !== nextProps.color) {
      return true;
    }
    // if (this.state.count !== nextState.count) {
    //   return true;
    // }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => {
          //   data.push(Math.random());
          this.setState(state => ({ count: this.state.count.push(Math.random()) }));
        }}
      >
        {/* Count: {this.state.count.length} */}
        Count: {this.state.count.size}
      </button>
    );
  }
}
export default CounterButton;
