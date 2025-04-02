import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';

const Todos = ({ checkTodo }) => {
  const { state, dispatch } = useContext(TodoContext);
  const [dragTask, setDragTask] = useState(null);
  const [dragOverTask, setDragOverTask] = useState('');
  const handleDrag = (e, task) => {
    e.preventDefault();
    setDragTask(task);
  };

  const handleOnDrop = (e) => {
    const newStatus = e.target.getAttribute('data-status');
    if (newStatus && dragTask && dragTask.status !== newStatus) {
      dispatch({
        type: 'EDIT_TODO',
        payload: {
          id: dragTask.id,
          updatedTodo: dragTask.todoItem,
          description: dragTask.description,
          priority: dragTask.priority,
          category: dragTask.category,
          status: newStatus,
        },
      });
    }
    setDragTask(null);
    setDragOverTask('');
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    const task = e.target.getAttribute('data-status');
    setDragOverTask(task);
  };

  const handleDragLeave = () => {
    setDragOverTask('');
  };


  const clearCompletedTasks = () => {
    const remainingTodos = state.todos.filter((todo) => todo.status !== 'DONE');
    dispatch({
      type: 'SET_TODOS',
      payload: remainingTodos,
    });
  };
  return (
    <div className="w-full flex justify-evenly items-start h-screen">
      <div
        className={`w-full flex flex-col items-center justify-start gap-4 ${dragOverTask === checkTodo.TODO ? 'bg-gray-200' : ''} h-[100%]`}
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        data-status={checkTodo.TODO}
      >
        <h5 className="text-2xl w-full text-center font-bold py-5 bg-[#ccbed7]">Todo</h5>
        <div className="">
          {state.todos
            .filter((todo) => todo.status === 'TODO')
            .map((item) => (
              <div
                draggable={true}
                onDrag={(e) => handleDrag(e, item)}
                key={item.id}
              >
                <TodoItem todoList={item} />
              </div>
            ))}
        </div>
      </div>

      <div
        className={`w-full flex flex-col items-center justify-start gap-4 border-x-1 border-gray-300 ${dragOverTask === checkTodo.DOING ? 'bg-gray-200' : ''} h-[100%]`}
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        data-status={checkTodo.DOING}
      >
        <h5 className="text-2xl text-center font-bold py-5 bg-[#c6e9a7] w-full">Doing</h5>
        <div className="">
          {state.todos
            .filter((todo) => todo.status === 'DOING')
            .map((item) => (
              <div
                draggable={true}
                onDrag={(e) => handleDrag(e, item)}
                key={item.id}
              >
                <TodoItem todoList={item} />
              </div>
            ))}
        </div>
      </div>

      <div
        className={`w-full flex flex-col items-center justify-start gap-4 ${dragOverTask === checkTodo.DONE ? 'bg-gray-200' : ''} h-[100%]`}
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        data-status={checkTodo.DONE}
      >
        <h5 className="text-2xl text-center font-bold py-5 w-full bg-[#ccbed7]">Done</h5>
        <div className="w-full flex justify-end pr-5">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={clearCompletedTasks}
          >
            Clear Completed
          </button>
        </div>
        <div className="">
          {state.todos
            .filter((todo) => todo.status === 'DONE')
            .map((item) => (
              <div
                draggable={true}
                onDrag={(e) => handleDrag(e, item)}
                key={item.id}
              >
                <TodoItem todoList={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Todos