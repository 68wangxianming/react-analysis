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
// import HookDemo from './demos/components/puredemo-immutable';
import HookDemo from './demos/hooks/test';
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
