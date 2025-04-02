import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';

const Todos = ({ checkTodo }) => {
  const { state, dispatch } = useContext(TodoContext);
  const [dragTask, setDragTask] = useState(null);
  const [todoCategory, setTodoCategory] = useState('Work');
  const [doingCategory, setDoingCategory] = useState('Work');
  const [doneCategory, setDoneCategory] = useState('Work');
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
        <div className='w-full text-center flex justify-center gap-5 items-center bg-[#ccbed7]'>
          <h5 className="text-2xl  font-bold py-5 ">Todo</h5>
          <select
            className="py-3 px-5 focus:outline-none"
            value={todoCategory}
            onChange={(e) => setTodoCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div className="">
          {state.todos
            .filter((todo) => todo.status === 'TODO' && todo.category === todoCategory)
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
        <div className='w-full text-center flex justify-center gap-5 items-center bg-[#c6e9a7]'>
          <h5 className="text-2xl  font-bold py-5 ">Doing</h5>
          <select
            className="py-3 px-5 focus:outline-none"
            value={doingCategory}
            onChange={(e) => setDoingCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div className="">
          {state.todos
            .filter((todo) => todo.status === 'DOING' && todo.category === doingCategory)
            .map((item) => (
              <div
                draggable={true}
                onDrag={(e) => handleDrag(e, item)}
                key={item.id}
              >
                <TodoItem todoList={item}  />
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
        <div className='w-full text-center flex justify-center gap-5 items-center bg-[#ccbed7]'>
          <h5 className="text-2xl  font-bold py-5 ">Done</h5>
          <select
            className="py-3 px-5 focus:outline-none"
            value={doneCategory}
            onChange={(e) => setDoneCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
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
            .filter((todo) => todo.status === 'DONE' && todo.category === doneCategory)
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