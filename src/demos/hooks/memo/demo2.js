import React from "react";
const { memo, useMemo, useState } = React;
const Counter = memo(props => {
  console.log("组件渲染");
  return <h1>{props.data}</h1>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const double = useMemo(() => {
    return count * 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count === 3]);
  const data = "京程一灯";
  return (
    <>
      <span>{double}</span>
      <input
        type="button"
        onClick={() => setCount(count + 1)}
        value="修改count"
      />
      <Counter data={data} />
    </>
  );
}
