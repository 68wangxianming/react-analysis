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

































