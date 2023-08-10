// ./client/src/App.tsx
import { useQuery } from '@apollo/client';
import { GET_TODOS } from './queries';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const todos: Todo[] = data.getTodos;

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
