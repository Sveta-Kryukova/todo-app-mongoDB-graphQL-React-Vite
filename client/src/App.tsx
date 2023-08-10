import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS, ADD_TODO, DELETE_TODO } from './queries';
import { useState } from 'react';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [query, setQuery] = useState<string>("");
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [removeTodo] = useMutation(DELETE_TODO, {
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

  return (
    <div>
      <h1>Todos</h1>
      <input 
        type="text" 
        placeholder="Add todo" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo: Todo) => (
          <div key={todo.id}>
            <li>{todo.text}</li>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
