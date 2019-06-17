import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import { Link } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="App">
        <ul className="nav green">
          <li>
            <Link to="/componentdemo">普通组件</Link>
          </li>
          <li>
            <Link to="/puredemo">纯组件</Link>
          </li>
          <li>
            <Link to="/functionaldemo">纯函数组件</Link>
          </li>
          <li>
            <Link to="/hocdemo">高阶组件</Link>
          </li>
          <li>
            <Link to="/portalsdemo">组件插槽</Link>
          </li>
          <li>
            <Link to="/suspensedemo">Suspense组件</Link>
          </li>
          <li>
            <Link to="/memodemo">Memo组件</Link>
          </li>
          <li>
            <Link to="/contextdemo">Context传递props</Link>
          </li>
          <li>
            <Link to="/refdemo">Ref新的使用</Link>
          </li>
          <li>
            <Link to="/errdemo">Error错误组件</Link>
          </li>
          <li>
            <Link to="/lifecycledemo">生命周期</Link>
          </li>
          <li>
            <Link to="/hookdemo">React Hooks</Link>
          </li>
          <li>
            <Link to="/fiberdemo">React Fiber</Link>
          </li>
        </ul>

        <div>{routes}</div>
      </div>
    );
  }
}

export default App;
