import React from "react";
const { useContext, useReducer, createContext } = React;
function middlewareLog(store, lastState, nextState, action, isDev) {
    if (isDev) {
        console.log(action.type);
        console.log("🐷last--->", lastState);
        console.log("🐶next--->", nextState);
    }
}
function reducerInAction(state, action) {
    if (typeof action.reducer == "function") {
        return action.reducer(state);
    }
    return state;
}
export default function createStore(params) {
    const { isDev, reducer, initialState, middleware } = {
        isDev: false,
        initialState: {},
        reducer: reducerInAction,
        middleware: params.isDev ? [middlewareLog] : undefined,
        ...params
    }
    const Appcontext = createContext();
    let isCheckedMiddleware = false;
    const middlewareReduer = (lastState, action) => {
        // switch (action.type) {
        //     case "init":
        //         return { ....}
        //     case "do":
        //         return { ....}
        // }
        let nextState = reducer(lastState, action);
        if (!isCheckedMiddleware) {
            if (!Array.isArray(middleware)) {
                throw new Error("react-hooks middleware必须是数组");
            }
            isCheckedMiddleware = true;
        }
        for (let item of middleware) {
            const newState = item(store, lastState, nextState, action, isDev);
            if (newState) {
                nextState = newState;
            }
        }
        //记得把这个修改后的装填到store
        store._state = nextState;
        return nextState;
    };
    const store = {
        _state: initialState,
        dispatch: undefined,
        getState: () => {
            return store._state;
        },
        useContext: () => {
            return useContext(Appcontext)
        }
    }
    const Provider = props => {
        const [state, dispatch] = useReducer(middlewareReduer, initialState);
        if (!store.dispatch) {
            store.dispatch = async (action) => {
                if (typeof action == "function") {
                    await action(dispatch, store._state)
                } else {
                    dispatch(action)
                }
            }
        }
        return <Appcontext.Provider {...props} value={state} />
    }
    return {
        Provider,
        store
    }
}