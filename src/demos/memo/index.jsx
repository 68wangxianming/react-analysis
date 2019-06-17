//React.memo() 是高阶函数能将函数组件转换成类似于React.PureComponent组件
import React, { memo, Component } from "react";

function Child({ seconds }) {
  console.log("I am rendering");
  return <div>Memo组件 seconds->{seconds} </div>;
}

function areEqual(prevProps, nextProps) {
  if (prevProps.seconds === nextProps.seconds) {
    return true;
  } else {
    return false;
  }
}
// const RocketComponent = props => <div>my rocket component. {props.fuel}!</div>;

// 创建一个只在prop改变时发生渲染的版本
// const MemoizedRocketComponent = memo(RocketComponent);
// const memocom = () => {
//   return memo(Child, areEqual);
// };
const DemoComponent = memo(Child, areEqual);

class Greeting extends Component {
  render() {
    return <DemoComponent seconds="20" />;
  }
}
export default Greeting;

// function Child({seconds}){
//     console.log('I am rendering');
//     return (
//         <div>I am update every {seconds} seconds</div>
//     )
// };
// export default React.memo(Child)
