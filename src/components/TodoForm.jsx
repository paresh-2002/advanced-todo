import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

function TodoForm({ setShowModal,checkTodo }) {
    const [todo, setTodo] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [category, setCategory] = useState('Work');
    const [error, setError] = useState(false);
    
    const { dispatch } = useContext(TodoContext)
    const onSubmit = (e) => {
        e.preventDefault();
        if (todo.trim() === '') {
            setError(true);
            return;
        }
        const newTodo = {
            id: Date.now(),
            todoItem: todo,
            description,
            status:checkTodo.TODO,
            priority,
            category,
            completed: false
        };
        dispatch({
            type: 'ADD_TODO',
            payload: newTodo
        })
        setTodo('');
        setDescription('');
        setPriority('Low');
        setCategory('Work');
        setError(false);
        setShowModal(false)
    };

    return (
        <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 "
            onClick={() => setShowModal(false)}
        >
            <div
                className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">Create New Todo</h3>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2"
                    >
                        <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>

                <form
                    className="flex flex-col items-center p-5"
                    onSubmit={onSubmit}
                >
                    <input
                        type="text"
                        className="w-full py-3 px-5 rounded-xl mt-5 border-b-1"
                        placeholder="Enter Todo Title"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    {error && (
                        <p className="text-sm text-red-500 text-start w-full">
                            Please enter a todo title.
                        </p>
                    )}

                    <div className="w-full flex justify-between items-center gap-3 mt-5">
                        <select
                            className="w-full py-3 px-5 rounded-xl border-b-1"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <select
                            className="w-full py-3 px-5 rounded-xl border-b-1"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                        </select>
                    </div>

                    <textarea
                        className="w-full py-3 px-5 rounded-xl mt-5 border-b-1"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-green-500 px-10 py-2 rounded-xl text-white mt-5"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TodoForm;