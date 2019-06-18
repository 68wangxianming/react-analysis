//Context 主要是解决props向多层嵌套的子组件传递的问题，原理是定义了一个全局对象
import React from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = React.createContext("default");

class Parent extends React.Component {
  state = {
    name: "普通字符串🍌",
    newContext: "小明"
  };

  //   getChildContext() {
  //     return { value: this.state.newContext, name: this.state.name };
  //   }
  render() {
    //    <React.Fragment> ==  <>
    return (
      <>
        <div>
          <label className="text-warning">父节点=> newContext:</label>
          <input
            type="text"
            value={this.state.newContext}
            onChange={e => this.setState({ newContext: e.target.value })}
          />
        </div>
        <div>
          <label className="text-info">父节点=>固定string:</label>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        {/* {this.props.children} */}
        <Provider value={{ newContext: this.state.newContext, name: "普通字符串🍌" }}>
          {this.props.children}
        </Provider>
      </>
    );
  }
}

function Child(props, context) {
  return (
    <Consumer>
      {value => (
        <p className="text-warning">子节点=> newContext: {value.newContext}</p>
      )}
    </Consumer>
  );
}

class Child2 extends React.Component {
  static contextTypes = {
    name: PropTypes.string
  };
  render() {
    // return <p>字符串a: {this.context.name}</p>;
    return (
      <Consumer>
        {value => <p className="text-info">子节点=> name: {value.name}</p>}
      </Consumer>
    );
  }
}
// Child.contextTypes = {
//   value: PropTypes.string
// };
// Parent.childContextTypes = {
//   value: PropTypes.string,
//   name: PropTypes.string
// };

export default () => (
  <Parent>
    <Child />
    <Child2 />
  </Parent>
);
