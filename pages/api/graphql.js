import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";

import typeDefs from "db/models/typeDefs";
import connectDB from "db/config/index";

// CONTROLLERS
import businessController from "controllers/businessController";
import serviceController from "controllers/serviceController";
import orderController from "controllers/orderController";
import userController from "controllers/userController";

// Models
import Service from "db/models/Service.model";

connectDB();

const cors = Cors();

const resolvers = {
  Query: {
    ...businessController.queries,
    ...serviceController.queries,
    ...orderController.queries,
    ...userController.queries,
  },
  Mutation: {
    ...serviceController.mutations,
    ...businessController.mutations,
    ...orderController.mutations,
    ...userController.mutations,
  },

  Business: {
    services: async (parent) => {
      const services = await Service.find({
        businessId: { $in: parent.id },
      });
      return services || [];
    },
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
