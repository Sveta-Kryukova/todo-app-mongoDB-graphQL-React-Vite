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