// //新增了render 新的返回类型：fragments 和 strings
// import React, { Component } from "react";
// class Greeting extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: props.initialCount };
//   }
//   static defaultProps = {
//     name: "普通Component组件"
//   };
//   render() {
//      return <h4 className="text-warning">Hello, {this.props.name}</h4>;
//     // return '我是一个字符串组件 🚀!';
//     // return [
//     //   // 不要忘记 key :)
//     //   <li key="A">First item</li>,
//     //   <li key="B">Second item</li>,
//     //   <li key="C">Third item</li>,
//     // ];
//   }
// }
// export default Greeting;
import React, { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    let me = this;
    me.setState({
      count: me.state.count + 1
    });
    console.log(me.state.count);    // 打印
    me.setState({
      count: me.state.count + 1
    });
    console.log(me.state.count);    // 打印
    setTimeout(function(){
     me.setState({
       count: me.state.count + 1
     });
     console.log('第一次',me.state.count);   // 打印
    }, 0);
    setTimeout(function(){
     me.setState({
       count: me.state.count + 1
     });
     console.log('第2次',me.state.count);   // 打印
    }, 0);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          React SetState 源码探究<code>src/App.js</code>
        </p>
        <hr/>
        <h1>{this.state.count}</h1>
      </div>
    );
  }
}

export default App;
