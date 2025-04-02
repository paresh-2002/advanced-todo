import { createContext, useReducer, useEffect } from "react";
import { reducer } from "./Reducer";

export const TodoContext = createContext();

const TodoProvider = (props) => {

    const initialState = {
        todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(state.todos));
    }, [state.todos]);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {props.children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
