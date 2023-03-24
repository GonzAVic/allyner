import { gql } from "apollo-server-micro";

const typeDefs = gql`
  # MODELS
  type Business {
    id: ID!
    name: String
    industry: String
    additionalData: String
  }

  type Service {
    id: ID!
    name: String
    description: String
    cover: String
    callToAction: String
    status: String
    questionList: String
  }

  input BusinessInput {
    name: String
    industry: String
    additionalData: String
  }

  input ServiceInput {
    name: String
    description: String
    cover: String
    callToAction: String
    status: String
    questionList: String
  }

  type Query {
    getBusiness(businessId: ID!): Business
    getService(serviceId: ID!): Service
  }

  type Mutation {
    createBusiness(input: BusinessInput!): Business

    createService(input: ServiceInput!): Service
    updateService(input: ServiceInput!, serviceId: ID!): Service
  }
`;

export default typeDefs;
