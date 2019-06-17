//Portals 提供了一个顶级的方法，使得我们有能力把一个子组件渲染到父组件 DOM 层级以外的 DOM 节点上。
import React from 'react'
import ReactDOM from 'react-dom'
import "./component.css"
//组件插槽
const portalElm = document.createElement('div');
portalElm.className="txtcenter"
document.body.appendChild(portalElm)

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
