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
// import {Component} from 'react'
// function HOCFactoryFactory(...params){
//     return function HOCFactory(WrappedComponent){
//         return class HOC extends Component{
//             render(){
//                 return <WrappedComponent {...this.props} />
//             }
//         }
//     }
// }
// //使用方式1
// @HOCFactoryFactory({})
// class WrappedComponent extends React.Component{}
// //使用方式2
// HOCFactoryFactory({})(WrappedComponent)


//4.redux
// 把redux的state和action创建函数，通过props注入给了Component。
// 你在目标组件Component里面可以直接用this.props去调用redux state和action创建函数了。

// ConnectedComment = connect(mapStateToProps, mapDispatchToProps)(Component);
