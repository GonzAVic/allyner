// import typeDefs from "db/models/typeDefs";
import connectDb from "db/config/index";

// CONTROLLERS
// import companyController from "controllers/companyController";

// MODELS
// import Asset from "db/models/Asset.model";

connectDb();

const resolvers = {
  Query: {
  },
  Mutation: {
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({
  schema,
}).createHandler({
  path: "/api/graphql",
});
