### 运行

npm install

npm run start



### 目录

```javascript
import React from 'react'
import { Route } from 'react-router-dom'
//普通的react组件
import ComponentDemo from './demos/components/componentdemo';
//react纯组件
import PureDemo from './demos/components/puredemo';
//函数组件
import FunctionalDemo from './demos/components/functionaldemo';
//高阶组件 Higher-Order Components
import HOCDemo from './demos/components/hocdemo';
//组件插槽 Higher-Order Components
import PortalsDemo from './demos/components/portalsdemo';
//异步组件和Suspense组件
import SuspenseDemo from './demos/suspense';
//Context api
import ContextDemo from './demos/context';
//将函数组件转换成纯组件
import MemoDemo from './demos/memo';
//ref新的使用方法
import RefDemo from './demos/ref/forwardref';
//错误的组件使用
import ErrorDemo from './demos/error';
//生命周期
import LifecycleDemo from './demos/lifecycle';
//react hooks
import HookDemo from './demos/components/puredemo-immutable';
//react fiber
import FiberDemo from './demos/fiber';
//react-call-return 父组件根据子组件的回调
//复用已有组件 ReactDOM.hydrate
export default (
  <>
    <Route path="/componentdemo" component={ComponentDemo} />
    <Route path="/puredemo" component={PureDemo} />
    <Route path="/functionaldemo" component={FunctionalDemo} />
    <Route path="/hocdemo" component={HOCDemo} />
    <Route path="/portalsdemo" component={PortalsDemo} />
    <Route path="/suspensedemo" component={SuspenseDemo} />
    <Route path="/contextdemo" component={ContextDemo} />
    <Route path="/memodemo" component={MemoDemo} />
    <Route path="/refdemo" component={RefDemo} />
    <Route path="/errdemo" component={ErrorDemo} />
    <Route path="/lifecycledemo" component={LifecycleDemo} />
    <Route path="/hookdemo" component={HookDemo} />
    <Route path="/fiberdemo" component={FiberDemo} />
  </>
)

```



### 普通的react组件

便利的写法

```javascript
return <h4 className="text-warning">Hello, {this.props.name}</h4>;
return '我是一个字符串组件 🚀!';
return [
  // 不要忘记 key :)
  <li key="A">First item</li>,
  <li key="B">Second item</li>,
  <li key="C">Third item</li>,
];
return <>不需要再创建元素container</>
```



### react纯组件

PureComponent的自动为我们添加的shouldComponentUpate函数

```javascript
import React, { PureComponent } from "react";
class CounterButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  render() {
    return (
      <button
        className="btn btn-info"
        onClick={() => this.setState(state => ({ count: state.count + 1 }))}
      >
        Count: {this.state.count}
      </button>
    );
  }
}
export default CounterButton;

```



### 函数组件

没有自身的状态，相同的props输入必然会获得完全相同的组件展示。不需要关心组件的一些生命周期函数和渲染的钩子更简洁。

**函数式编程 纯函数 相同的输入得到相同的输出，可以对函数进行缓存**

```javascript
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

```



### 高阶组件

高阶组件之前的代码

```javascript
import React, { Component } from "react";
class Welcome extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: ''
      }
  }

  componentWillMount() {
      let username = localStorage.getItem('username');
      this.setState({
          username: username
      })
  }

  render() {
      return (
          <div>welcome {this.state.username}</div>
      )
  }
}
class Goodbye extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: ''
      }
  }

  componentWillMount() {
      let username = localStorage.getItem('username');
      this.setState({
          username: username
      })
  }

  render() {
      return (
          <div>goodbye {this.state.username}</div>
      )
  }
}
```

高阶组件就是一个没有副作用的纯函数。

**高阶函数就是接受一个函数返回一个能力更强的函数，高阶组件就是接受一个组件返回一个能力更强的组件**

```javascript
import React, { Component } from "react";
const wrapWithUsername = WrappedComponent => {
  class NewComponent extends Component {
    constructor() {
      super();
      this.state = {
        username: ""
      };
    }
    componentWillMount() {
      let username = localStorage.getItem("username");
      this.setState({
        username: username
      });
    }

    render() {
      return <WrappedComponent username={this.state.username} />;
    }
  }

  return NewComponent;
};
class Welcome extends Component {
  render() {
    return <div className="text-warning">welcome {this.props.username}</div>;
  }
}
//升级高阶组件
Welcome = wrapWithUsername(Welcome);

class Goodbye extends Component {
  render() {
    return <div className="text-info">goodbye {this.props.username}</div>;
  }
}
//升级高阶组件
Goodbye = wrapWithUsername(Goodbye);
class Greeting extends Component {
  render() {
    return (
      <>
        <Welcome /> <Goodbye />
      </>
    );
  }
}
export default Greeting;
```



### 简单高阶组件

```javascript
//========demo1==============
function hello (){
    console.log("🚀我是高阶组件")
}
function hoc(fn){
    return ()=>{
          console.log("first");
            fn();
          console.log("end");
    }
}
const hocresult = hoc(hello);
hocresult();

//========demo2==============
function welcome(username) {
    console.log('welcome ' + username);
}

function goodbey(username) {
    console.log('goodbey ' + username);
}
//高阶函数
function wrapWithUsername(wrappedFunc) {
    let newFunc = () => {
        let username = localStorage.getItem('username');
        wrappedFunc(username);
    };
    return newFunc;
}

// eslint-disable-next-line no-func-assign
welcome = wrapWithUsername(welcome);
// eslint-disable-next-line no-func-assign
goodbey = wrapWithUsername(goodbey);

welcome();
goodbey();

//=========高阶组件的实战代码=====
import {Component} from 'react'
function HOCFactoryFactory(...params){
    return function HOCFactory(WrappedComponent){
        return class HOC extends Component{
            render(){
                return <WrappedComponent {...this.props} />
            }
        }
    }
}
//使用方式1
@HOCFactoryFactory({})
class WrappedComponent extends React.Component{}
//使用方式2
HOCFactoryFactory({})(WrappedComponent)
```



### 组件插槽

Portals 提供了一个顶级的方法，使得我们有能力把一个子组件渲染到父组件 DOM 层级以外的 DOM 节点上。

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import "./component.css"
//组件插槽
const portalElm = document.createElement('div');
portalElm.className="txtcenter";
portalElm.innerText='hello world!';
document.body.appendChild(portalElm);

class App extends React.Component {
  state = {
    show: true,
  }

  handleClick = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleClick}>动态展现Portal组件</button>
        {this.state.show ? (
          <div>{ReactDOM.createPortal(<span>Portal组件</span>, portalElm)}</div>
        ) : null}
      </div>
    )
  }
}
export default App

```



### 异步组件和Suspense组件

解决场景

```javascript
window.data = "";
var flag = false;
console.log('loading......')
async(()=>{
  //macrotask
  data + = await fetch('a.php');
  flag = true
})()
//同步
function test() {
  if(flag) {
   	console.log(data);
  }
  test()
}
test()
```

```javascript
import React, { Suspense, lazy } from "react";
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
var cached = {};//哨兵变量
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
      throw task;//必须是一个promise
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
```

输出结果 最少执行2遍

🌲--ref {}
index.jsx:27 🌺--cached {}
index.jsx:26 🌲--ref {}
index.jsx:27 🌺--cached {}
index.jsx:26 🌲--ref Data resolved
index.jsx:27 🌺--cached {}
index.jsx:32 🍎 Data resolved





























