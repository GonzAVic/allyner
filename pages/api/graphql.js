import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";

import typeDefs from "db/models/typeDefs";
import connectDB from "db/config/index";

// CONTROLLERS
import businessController from "controllers/businessController";
import serviceController from "controllers/serviceController";

// Models

connectDB();

const cors = Cors();

const resolvers = {
  Query: {
    ...businessController.queries,
    ...serviceController.queries,
  },
  Mutation: {
    ...serviceController.mutations,
    ...businessController.mutations,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
