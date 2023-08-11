import TodoModel, { TodoDocument } from '../models/Todo';

const resolvers = {
  Query: {
    async todo(_: any, { id }: { id: string }) {
      return await TodoModel.findById(id);
    },
    async getTodos(_: any, { amount }: { amount: number }) {
      const todos = await TodoModel.find().limit(amount);
      return todos.map((todo: TodoDocument) => ({
        id: todo._id.toString(),
        text: todo.text,
        completed: todo.completed,
      }));
    },
  },
  Mutation: {
    async addTodo(_: any, { TodoInput: { text } }: { TodoInput: { text: string } }) {
      const todo = new TodoModel({
        text,
        completed: false,
      });

      const savedTodo = await todo.save();
      return savedTodo;
    },
    async deleteTodo(_: any, { ID }: { ID: string }) {
      const wasDeleted = (await TodoModel.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async updateTodo(
      _: any,
      { ID, editTodoInput }: { ID: string; editTodoInput: { text: string; completed: boolean } }
    ) {
      const updatedTodo = await TodoModel.findByIdAndUpdate(
        ID,
        editTodoInput,
        { new: true }
      );
    
      return updatedTodo;
    },
  },
};

export default resolvers;