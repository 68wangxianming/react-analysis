import React from "react";
import YdHooksRedux from "./hooks-redux";
const { Provider, store } = YdHooksRedux({
    isDev: true,
    initialState: { name: "🏮一灯", age: 0 }
});

function timeOutAdd(a) {
    return new Promise(cb => setTimeout(() => cb(a + 1), 500))
}
const actionOfAdd = () => async (dispatch, ownState) => {
    const age = await timeOutAdd(ownState.age);
    dispatch({
        type: "asyncAdd",
        reducer(state) {
            return { ...state, age }
        }
    });
}
//同步的action
// function actionOfAdd() {
//     return {
//         type: "init",
//         reducer(state) {
//             return { ...state, age: state.age + 1 }
//         }
//     }
// }

function Button() {
    function handleAdd() {
        store.dispatch(actionOfAdd())
    }
    return <button onClick={handleAdd}>点击增加</button>
}

function Page() {
    const state = store.useContext();
    return (
        <div>
            {state.age}
            <Button />
        </div>
    )
}
export default function App() {
    return (
        <Provider>
            <Page />
        </Provider>
    )
}