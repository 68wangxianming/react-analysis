import { Component } from "react";
//废弃componentWillMount, componentWillReceiveProps, componentWillUpdate
//新增关键getSnapshotBeforeUpdate 、getDerivedStateFromProps
class Greeting extends Component {
  render() {
    return "详情见文件夹图片";
  }
}
export default Greeting;

  /**
   * dom渲染前保存了快照 一变后续使用
   */
  //   getSnapshotBeforeUpdate(prevProps, prevState) {
  //     // 保存滚动位置的快照
  //     if (prevProps.list.length < this.props.list.length) {
  //       const list = this.listRef.current;
  //       return list.scrollHeight - list.scrollTop;
  //     }
  //     return null;
  //   }

  //   componentDidUpdate(prevProps, prevState, snapshot) {
  //     // 如果有快照的值，说明已经增加的新的项.
  //     // 调整滚动位置使得新的项不会挤走老的项
  //     // 快照是从getSnapshotBeforeUpdate返回出来的
  //     if (snapshot !== null) {
  //       const list = this.listRef.current;
  //       list.scrollTop = list.scrollHeight - snapshot;
  //     }
  //   }

//=======================================

//React 15.X 初始化和更新分别写在constructor和componentWillReceiveProps.
// class Parent extends Component{
//     render(){
//         return (
//         <Child age={18} />
//         )
//     }
// }
// class Child extends Components{
//     constructor(props){
//         super(props);
//         this.state = {
//             age: this.props.age //装载阶段初始化state
//         }
//     }
//     componentWillReceiveProps(nextProps){
//         if(nextProps.age !== this.state.age){
//             this.setState({
//                 age: nextProps.age
//             }) // 修改state
//         }
//     }
//     render(){...}
// }
//===========react16============
// constructor(props){
//     super(props);
//     this.state = {
//         age: ''
//     }
// }
// static getDerivedStateFromProps(nextProps,prevState){
//     if(nextProps.age !== prevState.age){
//         return {
//             age: nextProps.age
//         }
//     }
//     return null;
// }