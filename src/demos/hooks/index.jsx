/**
 * 1.只能在函数组件中使用hooks
 * 2.函数组件业务变更无需修改成class组件
 * 3.告别了繁杂的this和难以记忆的生命周期
 * 4.合并的生命周期componentDidMount、componentDidUpdate、和 componentWillUnmount
 * 5.包装自己的hooks 是基于纯命令式的api
 * 6.更好的完成状态之间的共享 解决原来class组件内部封装问题。也解决了高阶组件和函数组件的嵌套过深
 * 7.useReducer集成redux
 * 8.useEffect接受脏操作等到react更新了DOM之后，它再依次执行我们定义的副作用函数。这里就是一个io且是异步的
 */
import React, { useState, useEffect } from "react";

const useCount = (initialCount = 0) => {
  const [count, setCount] = useState(initialCount);
  return [count, () => setCount(count + 1), () => setCount(count - 1)];
};

export default () => {
  const [count, increment, decrement] = useCount(1);
  //首次渲染完成
  //   componentDidMount() {
  //     document.title = `You clicked ${this.state.count} times`;
  //   }
  //更新渲染完成
  //   componentDidUpdate() {
  //     document.title = `You clicked ${this.state.count} times`;
  //   }
  //组件卸载阶段 == return function useEffect每次组件变更均执行
  // componentWillUnmount(){

  // }
  useEffect(() => {
    console.log("component update");
    document.title = `标题-${count} times`;
    return () => {
      console.log("unbind");
    };
  }, [count]);

  return (
    <>
      <input type="button" value="增加count" onClick={increment} />
      <span>当前count: {count}</span>
      <input type="button" value="减少count" onClick={decrement} />
    </>
  );
};
