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

