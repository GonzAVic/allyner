import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";

import typeDefs from "db/models/typeDefs";
import connectDB from "db/config/index";

// CONTROLLERS
import businessController from "controllers/businessController";
import serviceController from "controllers/serviceController";

// Models
import Pricing from "db/models/Pricing.model";

connectDB();

const cors = Cors();

const resolvers = {
  Query: {
    ...businessController.queries,
    ...serviceController.queries,
  },
  Mutation: {
    ...serviceController.mutations,
  },

  Service: {
    pricing: async (parent) => {
      const pricing = await Pricing.findById(parent.pricing);
      return pricing;
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
