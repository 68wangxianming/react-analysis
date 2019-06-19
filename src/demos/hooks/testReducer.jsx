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
    const [url,setUrl] = useState("www.baidu.com");
    const [state, dispatch] = useReducer(dataReducer, {
        url
    });

    function Test() {
        console.log('执行了Test');
        setUrl("www.taobao.org");
        return <span>{state.url}</span>
    }

    function handleAdd() {

    }

    useEffect(() => {
        dispatch({type: "init"});
    }, []);
    return (
        <>
            <button onClick={handleAdd}>点击更改</button>
            <Test/>
        </>
    )
}
