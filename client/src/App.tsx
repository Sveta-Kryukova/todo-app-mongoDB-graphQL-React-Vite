import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO } from './queries/queries';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/types';

import './App.scss';
import add from './images/add.png';

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const addIMG = add;

  const [query, setQuery] = useState<string>("");
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [removeTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const todos: Todo[] = data.getTodos;

  const handleAddTodo = () => {
    if (query.trim() !== "") {
      addTodo({
        variables: {
          TodoInput: {
            text: query,
          },
        },
      }).catch((error) => {
        console.error('Error adding todo:', error);
      });
      setQuery("");
    }
  };

  const handleDeleteTodo = (id: string) => {
    removeTodo({
      variables: {
        ID: id,
      },
    }).catch((error) => {
      console.error('Error deleting todo:', error);
    });
  };

  const handleToggleTodo = (id: string, completed: boolean) => {
    updateTodo({
      variables: {
        ID: id,
        editTodoInput: {
          completed: !completed,
        },
      },
    }).catch((error) => {
      console.error('Error updating todo:', error);
    });
  };

  const handleUpdateText = (id: string, newText: string) => {
    updateTodo({
      variables: {
        ID: id,
        editTodoInput: {
          text: newText,
        },
      },
    }).catch((error) => {
      console.error('Error updating todo text:', error);
    });
  };

  return (
    <div className='app'>
      <h1 className='app__title'>Todos</h1>
      <div className='app__wrapper'>
        <input 
          type="text" 
          placeholder="Add todo" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className='app__wrapper__input'
        />

        <button onClick={handleAddTodo} className='app__wrapper__button'>
          <img 
            src={addIMG} 
            alt="Add todo" 
            className='app__wrapper__button__image'
          />
        </button>
      </div>

      <TodoList 
        todos={todos} 
        onDelete={handleDeleteTodo} 
        onToggle={handleToggleTodo} 
        onUpdateText={handleUpdateText}
      />
    </div>
  );
}

export default App;
