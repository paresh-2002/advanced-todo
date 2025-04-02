export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
            };

        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id),
            };

        case 'EDIT_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? {
                            ...todo,
                            todoItem: action.payload.updatedTodo,
                            description: action.payload.description,
                            priority: action.payload.priority,
                            category: action.payload.category,
                            status: action.payload.status,
                        }
                        : todo
                ),
            };

        case 'SET_TODOS':
            return {
                ...state,
                todos: action.payload,
            };

        default:
            return state;
    }
};
