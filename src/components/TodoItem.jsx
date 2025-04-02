import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

function TodoItem({ todoList }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todoList.todoItem);
  const [description, setDescription] = useState(todoList.description);
  const [priority, setPriority] = useState(todoList.priority);
  const [category, setCategory] = useState(todoList.category);
  const [isDeleted, setIsDeleted] = useState(false); 
  const [undoTimeout, setUndoTimeout] = useState(null);

  const { dispatch } = useContext(TodoContext);

  // Edit Todo
  const editTodo = () => {
    setIsTodoEditable(false);
    dispatch({
      type: "EDIT_TODO",
      payload: {
        id: todoList.id,
        updatedTodo: todoMsg,
        description,
        priority,
        category,
        status: todoList.status
      },
    });
  };

  // Toggle Completed
  // const toggleCompleted = () => {
  //   dispatch({
  //     type: 'TOGGLE_TODO',
  //     payload: {
  //       id: todoList.id,
  //       // status:todoList.status = 'DONE'
  //     },
  //   });
  // };

  const dragstartHandler = (ev) => {
    ev.dataTransfer.setData("text/plain", todoList.id);
  };

  const deleteTodo = () => {
    setIsDeleted(true);

    const timeoutId = setTimeout(() => {
      dispatch({ type: "DELETE_TODO", payload: { id: todoList.id } });
    }, 5000);

    setUndoTimeout(timeoutId);
  };

  const undoDelete = () => {
    setIsDeleted(false);
    clearTimeout(undoTimeout);
  };

  if (isDeleted) {
    return (
      <div className="p-2 bg-red-100 border border-red-300 rounded-lg flex justify-between items-center">
        <span>Task deleted. Undo?</span>
        <button
          onClick={undoDelete}
          className="text-blue-500 hover:underline"
          aria-label="Undo delete"
        >
          Undo
        </button>
      </div>
    );
  }


  return (
    <div id={`todo-${todoList.id}`} className="p-2">
      <div
        className={`flex flex-col w-full border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${todoList.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}
        draggable={!todoList.completed}
        onDragStart={dragstartHandler}
      >
        {/* <input
                type="checkbox"
                className="cursor-pointer"
                checked={todoList.completed}
                onChange={toggleCompleted}
            /> */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className={`p-2 text-2xl border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10" : "border-transparent"} ${todoList.completed ? "line-through" : ""}`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
            aria-label="Todo title"
          />
        
          <select
            className={`border outline-none p-2 w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10" : "border-transparent"} ${todoList.completed ? "line-through" : ""}`}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={!isTodoEditable}
            aria-label="Todo priority"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            className={`border outline-none w-full p-2 bg-transparent rounded-lg ${isTodoEditable ? "border-black/10" : "border-transparent"} ${todoList.completed ? "line-through" : ""}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!isTodoEditable}
            aria-label="Todo category"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
            <textarea
            type="text"
            className={`p-2 border text-[#808080] outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10" : "border-transparent"} ${todoList.completed ? "line-through" : ""}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            readOnly={!isTodoEditable}
            aria-label="Todo description"
          />
        </div>

        <div className="flex justify-evenly items-center pt-5">
          <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            onClick={() => {
              if (todoList.completed) return;

              if (isTodoEditable) {
                editTodo();
              } else setIsTodoEditable((prev) => !prev);
            }}
            disabled={todoList.completed}
            aria-label={isTodoEditable ? "Save todo" : "Edit todo"}
          >
            {isTodoEditable ? "📁" : "✏️"}
          </button>
          <button
             onClick={deleteTodo}
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            aria-label="Delete todo"
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;