// ./client/src/queries.ts
import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      text
      completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($TodoInput: TodoInput!) {
    addTodo(TodoInput: $TodoInput) {
      id
      text
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodoMutation($ID: ID!) {
    deleteTodo(ID: $ID)
  }
`;

