import React from "react";
// const { List } = require("immutable");
// class ListOfWords extends React.PureComponent {
//   render() {
//     return <div>{this.props.words.join(",")}</div>;
//   }
// }

// class WordAdder extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       words: ["marklar"]
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log("nextState", nextState);
//     console.log("this.state", this.state);
//     if (this.props.color !== nextProps.color) {
//       return true;
//     }
//     if (this.state.count !== nextState.count) {
//       console.log("🍊")
//       return true;
//     }
//     return false;
//   }
//   handleClick() {
//     // 这个地方导致了bug
//     const words = this.state.words;
//     words.push("marklar");
//     this.setState({ words: words });
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.handleClick}>测试</button>
//         <ListOfWords words={this.state.words} />
//       </div>
//     );
//   }
// }
// export default WordAdder;
// // let data = [];
//创建不可变的对象✅
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       count: []
      // count: List(["start"])
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
        console.log("🍊")
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => {
            this.setState(state => ({ count: this.state.count.concat(Math.random()) }));
           //this.setState(state => ({ count: this.state.count.push(Math.random()) }));
        }}
      >
        Count: {this.state.count.length}
        {/* Count: {this.state.count.size} */}
      </button>
    );
  }
}
export default CounterButton;
