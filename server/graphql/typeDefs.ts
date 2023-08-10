// ./server/graphql/typeDefs.ts
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Todo {
    id: ID
    text: String
    completed: Boolean
  }

  input TodoInput {
    text: String
    completed: Boolean
  }

  input EditTodoInput {
    text: String
    completed: Boolean
  }

  type Query {
    todo(ID: ID!): Todo!
    getTodos(amount: Int): [Todo]
  }

  type Mutation {
    addTodo(TodoInput: TodoInput!): Todo!
    deleteTodo(ID: ID!): Boolean
    updateTodo(ID: ID!, editTodoInput: TodoInput!): Boolean
  }
`;

export default typeDefs;
