//没有自身的状态，相同的props输入必然会获得完全相同的组件展示。不需要关心组件的一些生命周期函数和渲染的钩子更简洁。
import React, { Component } from "react";
const Button = ({ day }) => {
  return (
    <div>
      <button className="btn btn-warning">我是 {day}</button>
    </div>
  );
};
class Greeting extends Component {
  render() {
    return <Button day="纯函数组件"></Button>;
  }
}
export default Greeting;
