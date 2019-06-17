import React from "react";
const { memo, useEffect, useCallback, useMemo, useState } = React;
const Counter = memo(props => {
  // useEffect(() => {
  //   console.log('子组件渲染副作用')
  // })
  console.log("子组件渲染");
  return <h1 onClick={props.onClick}>{props.data}</h1>;
});
export default function App() {
  console.log("父亲组件渲染");
  const [count, setCount] = useState(0);
  const data = "京程一灯";
  // const onClick = () => {
  //   console.log("Click");
  // };
  // useEffect(() => {
  //   console.log('父组件副作用')
  // })
  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log("Click");
  //   };
  // }, []);
  const onClick = useCallback(() => {
    console.log("Click");
  }, []);
  return (
    <>
      <span>{count}</span>
      <input
        type="button"
        onClick={() => setCount(count + 1)}
        value="修改count"
      />
      <Counter onClick={onClick} data={data} />
    </>
  );
}
