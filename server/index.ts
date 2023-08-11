import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

dotenv.config();

const MONGO_DB = process.env.MONGO_DB;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(MONGO_DB as string)
  .then(() => {
    console.log('MongoDB connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`🚀🚀🚀Server running at ${res.url}`);
  });
