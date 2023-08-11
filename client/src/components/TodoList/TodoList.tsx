import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/types';

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onUpdateText: (id: string, newText: string) => void;
};

export const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onToggle, onUpdateText }) => {
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <TodoItem 
         key={todo.id} 
         todo={todo} 
         onDelete={onDelete} 
         onToggle={onToggle} 
         onUpdateText={onUpdateText}
        />
      ))}
    </ul>
  );
};
