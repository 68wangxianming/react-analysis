/**
 * 以上我们学习过的方法均提供了ref
 * useState 返回有状态值，以及更新这个状态值的函数
 * useEffect 接受包含命令式，可能有副作用代码的函数。
 * useContext 接受上下文对象（从React.createContext返回的值）并返回当前上下文值，
 * useReducer useState的替代方案。接受类型为(state，action) => newState的reducer，并返回与dispatch方法配对的当前状态。 
 * useCallback  返回一个回忆的memoized版本，该版本仅在其中一个输入发生更改时才会更改。纯函数的输入输出确定性
 * useMemo 纯的一个记忆函数
 * useRef 返回一个可变的ref对象，其.current属性被初始化为传递的参数
 * useImperativeMethods 自定义使用ref时公开给父组件的实例值
 * useMutationEffect 更新兄弟组件之前，它在React执行其DOM改变的同一阶段同步触发
 * useLayoutEffect DOM改变后同步触发。使用它来从DOM读取布局并同步重新渲染
 */
import React, {
    memo,
    createContext,
    forwardRef,
    useState,
    useEffect,
    useCallback,
    useContext,
    useRef,
    useImperativeHandle
  } from 'react'
  
  const TestContext = createContext('default')
  
  const Comp = memo((props) => {
    useEffect(() => {
      console.log('comp updated')
    })
  
    const updateValue = () => {
      props.onChick(props.name + '1')
    }
  
    return <button onClick={updateValue}>button {props.name}</button>
  })
  
  const ContextComp = forwardRef((props, ref) => {
    const [name] = useState('123')
    const context = useContext(TestContext)
  
    useEffect(() => {
      console.log('context comp updated')
    })
  
    useImperativeHandle(ref, () => ({
      method() {
        console.log('method invoked')
      }
    }))
  
    return <p>{context} {name}</p>
  })
  
  export default function App() {
    const [name, setName] = useState('jokcy')
    const [compName, setCompName] = useState('compName')
    const ref = useRef()
    useEffect(() => {
      console.log('component update')
      ref.current.method()
      // api.sub
      return () => {
        console.log('unbind')
      }
    }, [name]) // 去掉这个数组就会每次都调用
  
    const compCallback = useCallback((value) => {
      setCompName(value)
    }, [compName]) // 演示没有`[compName]`每次Comp都会调用effect
  
    return (
      <>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <Comp name={compName} onClick={compCallback} />
        <TestContext.Provider value={name}>
          <ContextComp ref={ref} />
        </TestContext.Provider>
      </>
    )
  }
  