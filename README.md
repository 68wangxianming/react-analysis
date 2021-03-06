运行

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

便利的写法 新增了render 新的返回类型：fragments 和 strings

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

新hocks解决 原理同上

```javascript
import React, { Suspense, lazy } from "react";
import { useFetch } from "react-hooks-fetch";
//动态加载组件
const LazyComp = lazy(() => import("./lazy"));

function SuspenseComp() {
    const {error,data} = useFetch("a.php");
    console.log("数据📚",data)
  return <p className="text-warning">{data}</p>;
}

export default () => (
  <Suspense fallback={<div className="text-danger">loading<i></i></div>}>
    <SuspenseComp />
    <LazyComp />
  </Suspense>
);
```

### memo

将函数组件转换成纯组件

```javascript
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
```



### Context

```javascript
//Context 主要是解决props向多层嵌套的子组件传递的问题，原理是定义了一个全局对象
import React from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = React.createContext("default");

class Parent extends React.Component {
  state = {
    name: "普通字符串🍌",
    newContext: "小明"
  };

  //   getChildContext() {
  //     return { value: this.state.newContext, name: this.state.name };
  //   }
  render() {
    //    <React.Fragment> ==  <>
    return (
      <>
        <div>
          <label className="text-warning">父节点=> newContext:</label>
          <input
            type="text"
            value={this.state.newContext}
            onChange={e => this.setState({ newContext: e.target.value })}
          />
        </div>
        <div>
          <label className="text-info">父节点=>固定string:</label>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        {/* {this.props.children} */}
        <Provider value={{ newContext: this.state.newContext, name: "普通字符串🍌" }}>
          {this.props.children}
        </Provider>
      </>
    );
  }
}

function Child(props, context) {
  return (
    <Consumer>
      {value => (
        <p className="text-warning">子节点=> newContext: {value.newContext}</p>
      )}
    </Consumer>
  );
}

class Child2 extends React.Component {
  static contextTypes = {
    name: PropTypes.string
  };
  render() {
    // return <p>字符串a: {this.context.name}</p>;
    return (
      <Consumer>
        {value => <p className="text-info">子节点=> name: {value.name}</p>}
      </Consumer>
    );
  }
}
// Child.contextTypes = {
//   value: PropTypes.string
// };
// Parent.childContextTypes = {
//   value: PropTypes.string,
//   name: PropTypes.string
// };

export default () => (
  <Parent>
    <Child />
    <Child2 />
  </Parent>
);
```



### Ref

```javascript
import React from 'react'

const TargetComponent = React.forwardRef((props, ref) => (
  <input type="text" ref={ref} />
))

export default class Comp extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef()//symbol
  }

  componentDidMount() {
    this.ref.current.value = '转发ref成功🍺'
  }

  render() {
    return <TargetComponent ref={this.ref} />
  }
}
```



### error

componentDidCatch新的生命周期

```javascript
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  //捕捉错误和错误上报程序库一起使用
  componentDidCatch(err, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong!</div>;
    }
    return this.props.children;
  }
}
class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {  };
    }
    render() {
      return <span>用户名：{this.state.user.push(1)}</span>
    }
  }

class Greeting extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Profile/>
      </ErrorBoundary>
    );
  }
}
export default Greeting;
```



### 生命周期

![Image text](https://github.com/68wangxianming/react-analysis/blob/master/src/demos/lifecycle/react15%E5%A3%B0%E6%98%8E%E5%90%8E%E6%9C%9F%E6%B5%81%E7%A8%8B.png)

![Image text](https://github.com/68wangxianming/react-analysis/blob/master/src/demos/lifecycle/react15%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

![Image text](https://github.com/68wangxianming/react-analysis/blob/master/src/demos/lifecycle/react16%E5%91%A8%E6%9C%9F-1.png)

![Image text](https://github.com/68wangxianming/react-analysis/blob/master/src/demos/lifecycle/react16%E5%91%A8%E6%9C%9F.png)

![Image text](https://github.com/68wangxianming/react-analysis/blob/master/src/demos/lifecycle/state%E5%8F%AF%E7%94%A8%E5%91%A8%E6%9C%9F.png)

React 新的调度算法过滤掉了一些没用的生命周期

```javascript
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
```

### Hooks

- useState 返回有状态值，以及更新这个状态值的函数
- useEffect 接受包含命令式，可能有副作用代码的函数。
- useContext 接受上下文对象（从React.createContext返回的值）并返回当前上下文值，
- useReducer useState的替代方案。接受类型为(state，action) => newState的reducer，并返回与dispatch方法配对的当前状态。
- useCallback  返回一个回忆的memoized版本，该版本仅在其中一个输入发生更改时才会更改。纯函数的输入输出确定性
- useMemo 纯的一个记忆函数
- useRef 返回一个可变的ref对象，其.current属性被初始化为传递的参数
- useImperativeMethods 自定义使用ref时公开给父组件的实例值
- useMutationEffect 更新兄弟组件之前，它在React执行其DOM改变的同一阶段同步触发
- useLayoutEffect DOM改变后同步触发。使用它来从DOM读取布局并同步重新渲染



#### 作用

- 1.只能在函数组件中使用hooks
- 2.函数组件业务变更无需修改成class组件
- 3.告别了繁杂的this和难以记忆的生命周期 （useEffect）
- 4.合并的生命周期componentDidMount、componentDidUpdate、和 componentWillUnmount
- 5.包装自己的hooks 是基于纯命令式的api （可以讲组件里的生命周期抽出去给别的组件使用）
- 6.更好的完成状态之间的共享 解决原来class组件内部封装问题。也解决了高阶组件和函数组件的嵌套过深
- 7.useReducer集成redux
- 8.useEffect接受脏操作等到react更新了DOM之后，它再依次执行我们定义的副作用函数。这里就是一个io且是异步的



#### useState

useState 返回有状态值，以及更新这个状态值的函数

```
const [name,setName] = useState('123');
setName(456);//异步的
console.log(name);//456
```

#### useEffect

useEffect 接受包含命令式，可能有副作用代码的函数。(一个壳子不变，发送请求获取数据，拿回数据渲染dom)

合并的生命周期componentDidMount、componentDidUpdate、和 componentWillUnmount

```javascript
  useEffect(() => {
    console.log("component update");
    document.title = `标题-${count} times`;
    //后面什么都不写代表componentDidMount、componentDidUpdate
  })

```

```javascript
useEffect(() => {
    console.log("component update");
    document.title = `标题-${count} times`;
    //后面什么都不写代表componentDidMount、componentDidUpdate
  	//代表componentWillUnmount
  	return ()=>{
      console.log('unbind')
    }
})
return (
    <>
    	<input type="button" value="增加count" onClick={increment} />
      <span>当前count: {count}</span>
      <input type="button" value="减少count" onClick={decrement} />
    </>
);
//这样写的弊端 只要页面一动useEffect会每次都执行，所以useEffect里有ajax请求就会瞬间爆炸

```

**解决办法**

```javascript
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
  }, [count]);//count变我才变

  return (
    <>
      <input type="button" value="增加count" onClick={increment} />
      <span>当前count: {count}</span>
      <input type="button" value="减少count" onClick={decrement} />
    </>
  );
};


```

#### useMemo

memo —> UseMemo(指定一个参数) —> useCallback 缓存参数

useMemo —> return ()=>{} == useCallback 函数

```javascript
import React from "react";
const { memo, useState } = React;
// const Counter = memo(props => {
//   console.log("组件渲染");
//   return <h1>{props.data}</h1>;
// });
//传统的写法 count发生变化 Counter组件跟着不断渲染
const Counter = props => {
  console.log("组件渲染");
  return <h1>{props.data}</h1>;
};
export default function App() {
  const [count, setCount] = useState(0);
  const data = "xiaoming";
  return (
    <>
      <span>{count}</span>
      <input
        type="button"
        onClick={() => setCount(count + 1)}
        value="修改count"
      />
      <Counter data={data} />
    </>
  );
}

```

useMemo缓存函数

```javascript
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
  const data = "xiaoming";
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

```



#### useCallback

```javascript
import React, {
    memo,
    useState,
    useEffect,
    useCallback
} from 'react'


const Comp = memo((props) => {
    useEffect(() => {
        console.log('comp updated')
    })

    const updateValue = () => {
        props.onClick(props.name + '1')
    }

    return <button onClick={updateValue}>button {props.name}</button>
})



export default function App() {
    const [compName, setCompName] = useState('子组件');

    const compCallback = useCallback((value) => {
        setCompName(value)
    }, [compName]) // 演示没有`[compName]`每次Comp都会调用effect

    return (
        <>
            <Comp name={compName} onClick={compCallback} />
        </>
    )
}

```

```javascript
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

```



#### useReducer

- React 本身只涉及UI层，如果搭建大型应用，必须搭配 一个前端框架。
- Flux 是一种架构思想，专门解决软件的结构问题。它跟 MVC 架构是同一类东西，但是更加简单和清晰。
- View: 视图层
- Action(动作):视图层发出的消息(比如mouseClick)
- Dispatcher(派发器):用来接收Actions、执行回调函数
- Store(数据层):用来存放应用的状态，一旦发生变动，就提醒Views要更新页面

##### Redux

- Flux存在多种实现(至少15种)Redux还算不错

- redux.min.js、react-redux.js、redux-thunk.min.js、

- keyMirror.js、immutable.min.js、reqwest.js(fectch)、 ReduxThunk.js

- 管理应用的 state 

  通过 store.getState() 可以获取 state 
  通过 store.dispatch(action) 来触发 state 更新 
  通过 store.subscribe(listener) 来注册 state 变化监听器  通过 createStore(reducer, [initialState]) 创建

- Provider(ReactRedux)注入store <Provider store={store} <App/> </Provider>

- Actions JavaScript 普通对象 通过constants取到

- 对应 Actions Reducer 返回规律，更具体的是返回状态 ( Redux.combineReducers返回唯一的 Reducer)。

- Store(Redux.createStore(rootReducer,Redux.applyMiddleware(thunkMiddleware)))具体实施的载体

- components具体React的组件但是不涉及状态

- components->APP容器 react-redux 提供 connect 的方法链接React组件和Redux类

![Image text](https://github.com/68wangxianming/react-analysis/blob/master/src/demos/reduxdemo/1.jpg)

```
import React from "react";

const {useReducer, useState, useEffect} = React;
const dataReducer = (state, action) => {
    switch (action.type) {
        case "init":
            console.log('🍌useEffect后面要加数组，不然会一直执行')
            return {...state}
        case "success":
            return {...state}
        case "fail":
            return {...state}
        default:
            throw new Error("🍎Reducer")
    }
}


export default function App() {
    const [url] = useState("www.baidu.com");
    const [state, dispatch] = useReducer(dataReducer, {
        url
    });
    useEffect(() => {
        dispatch({type: "init"});
    },[]);
    return (
        <>
            <span>{state.url}</span>
        </>
    )
}

```

Redux 验证了函数式编程

函数式编程

容器 —> 容器里有value —> value是值 —> 值接受变形关系 —> map形成函子

store —> container

state —> value

action —> 变形关系

reducer —> map

middle —> IO函子 通过（monad 异步脏操作）



#### useContext

```
import React, {
  createContext,
  useState,
  useContext,
} from "react";

const TestContext = createContext("default");

const ContextComp = (props, ref) => {
    const context = useContext(TestContext);
  return (
    <p>
      {context}
    </p>
  );
};

export default function App() {
  const [name, setName] = useState("xiaoming");
  return (
    <>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <TestContext.Provider value={name}>
        <ContextComp />
      </TestContext.Provider>
    </>
  );
}
```

#### useRef

```
import React, {
    forwardRef,
    useRef,
    useEffect,
    useImperativeHandle
} from "react";

const ContextComp = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        method() {
            console.log("ref方法执行");
        }
    }));

    return <p>子组件</p>;
});

export default function App() {
    const ref = useRef();
    useEffect(() => {
        console.log("component update");
        ref.current.method();
        //卸载生命周期
        return () => {
            console.log("unbind");
        };
    }, []);
    return (
        <>
            <ContextComp ref={ref}/>
        </>
    );
}
```

### Fiber

计算机科学中除了进程(Process)和线程(Thread)的概念还有一个概念叫做Fiber，英文含义就是 “纤维”，意指比Thread更细的线，也就是比线程(Thread)控制得更精密的并发处理机制。Fiber 可以 提升复杂React 应用的可响应性和性能。Fiber 即是React新的调度算法(reconciliation algorithm)现 有React中，更新过程是同步的，当组件树比较庞大的时候，浏览器主线程被React占用。用户此时输入 Input会造成页面卡顿。

Fiber使用协作式多任务处理任务。将原来的整个 Virtual DOM 的更新任务拆分成一个个小的任务。每 次做完一个小任务之后，放弃一下自己的执行将主线程空闲出来，看看有没有其他的任务。如果有的话，就暂停本次任务，执行其他的任务，如果没有的话，就继续下一个任务。

该window.requestIdleCallback()方法将在浏览器的空闲时段期间对要调用的函数进行排队。这使开发人员能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数通常以先进先出顺序调用; 但是，`timeout`如果需要，可以在无效时调用具有指定的回调，以便在超时之前运行它们。

您可以`requestIdleCallback()`在空闲回调函数内调用，以便在下一次通过事件循环之前安排另一个回调。

```
const IdleCallback = requestIdleCallback((deadline) => {
  //剩余时间
  console.log(deadline.timeRemaining());
  //表示时间是否超时了
  console.log(deadline.didTimeout);
  }, {})

  console.log(performance.now());
  requestAnimationFrame(function F(f) {
  console.log(f, '========');
  requestAnimationFrame(F)
})

```

```
const channel = new MessageChannel();
const port1 = channel.port1;
const port2 = channel.port2;
port1.onmessage=function (event) {
    console.log("port1接受到port2的信息",event.data);
}

port2.postMessage("🍎")
```

