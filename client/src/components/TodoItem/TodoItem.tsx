import React, { useState } from 'react';
import { Todo } from '../../types/types';

import './TodoItem.scss';
import edit from '../../images/edit.png';
import save from '../../images/save.png';
import del from '../../images/delete.png';

type TodoItemProps = {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onUpdateText: (id: string, newText: string) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle, onUpdateText }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const editIMG = edit;
  const saveIMG = save;
  const delIMG = del;

  const handleSaveText = () => {
    setEditing(false);
    onUpdateText(todo.id, newText);
  };

  const handleBlur = () => {
    if (editing) {
      handleSaveText();
    }
  };

  return (
    <div className="todo-item">
      <input 
        type='checkbox' 
        className={`todo-item__checkbox ${editing ? 'editing' : ''}`} 
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
      />

      {editing ? (
        <input
          type="text"
          className='todo-item__edit-input'
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleBlur}
        />
      ) : (
        <li className='todo-item__name'>{todo.text}</li>
      )}

      <button onClick={() => setEditing(true)} className='todo-item__edit-button'>
        <img 
          src={editIMG} 
          alt="Edit todo" 
          className='todo-item__edit-button__image'
        />
      </button>

      {editing && (
        <button onClick={handleSaveText} className='todo-item__save-button'>
          <img 
            src={saveIMG} 
            alt="Save todo" 
            className='todo-item__save-button__image'
          />
        </button>
      )}

      <button onClick={() => onDelete(todo.id)} className='todo-item__button'>
        <img 
          src={delIMG} 
          alt="Delete todo" 
          className='todo-item__button__image'
        />
      </button>
    </div>
  );
};
