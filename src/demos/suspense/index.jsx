//新增了render 新的返回类型：fragments 和 strings
import React, { Suspense, lazy } from "react";
import "./suspense.css";
// import { useFetch } from "react-hooks-fetch";
// console.log("异步加载数据", useFetch);
//动态加载组件
const LazyComp = lazy(() => import("./lazy"));

function fetchApi() {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve("Data resolved");
    }, 3000);
  });
  return promise;
}
//创建Fetcher
var cached = {};
const createFetcher = promiseTask => {
  let ref = cached;
  return () => {
    const task = promiseTask();
    task.then(res => {
      ref = res;
    });
    console.log("🌲--ref",ref);
    console.log("🌺--cached",cached);
    if (ref === cached) {
      throw task;
    }
    //得到结果输出
    console.log("🍎",ref);
    return ref;
  };
};
const requestData = createFetcher(fetchApi);
function SuspenseComp() {
    // const {error,data} = useFetch("a.php");
    // console.log("数据📚",data)
    // if (error) return <span>出错了/(ㄒoㄒ)/~~</span>;
    // if (!data) return null;
    // return <span>RemoteData:{data.title}</span>;
  const data = requestData();
  return <p className="text-warning">{data}</p>;
}

export default () => (
  <Suspense fallback={<div className="text-danger">loading<i></i></div>}>
    <SuspenseComp />
    <LazyComp />
  </Suspense>
);
