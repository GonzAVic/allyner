import { gql } from "apollo-server-micro";

const typeDefs = gql`
  # MODELS
  type Business {
    name: String!
    industry: Industries!
    # onboarding: Onboarding!
    # services: [Service!]!
  }

  type Service {
    title: String!
    description: String!
    callToAction: String!
    cover: String!
    isOriginal: Boolean!

    # pricing: Pricing!
    # questionnaire: [Question]!
    # status: ServiceStatus!
    # businessId: ID!
  }

  # INPUTS
  input ServiceInput {
    title: String
    description: String
    callToAction: String
    cover: String
    isOriginal: Boolean
  }

  type Query {
    getBusiness: Business
  }

  type Mutation {
    createService(input: ServiceInput): Service
  }

  enum Industries {
    TECH
    ARQUITECTURE
    ACCOUNTANCY
    GAMMING
  }
`;

export default typeDefs;
