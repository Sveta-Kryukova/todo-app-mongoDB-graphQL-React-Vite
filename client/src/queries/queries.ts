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

export const UPDATE_TODO = gql`
  mutation UpdateTodoMutation($ID: ID!, $editTodoInput: EditTodoInput!) {
    updateTodo(ID: $ID, editTodoInput: $editTodoInput) {
      id
      text
      completed
    }
  }
`;

