import { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';

function App() {
  const [checkTodo, setCheckTodo] = useState({
    TODO: 'TODO',
    DOING: 'DOING',
    DONE: 'DONE',
  });
  
  const [showModal, setShowModal] = useState(false);
  
  const handleBackdropClick = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-[1440px] m-auto h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center py-10">Todo List</h1>
        <button
          onClick={() => setShowModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Create New Todo
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-gray-100/75"
          onClick={handleBackdropClick}
        >
          <TodoForm setShowModal={setShowModal} checkTodo={checkTodo} />
        </div>
      )}
  <Todos checkTodo={checkTodo}/>
      
    </div>
  );
}

export default App;