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
