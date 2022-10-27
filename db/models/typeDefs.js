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
    id: ID!
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

  type Pricing {
    type: PricingType!
    durationHours: Int
    durationMinutes: Int
    amount: Int!
    isOriginal: Boolean!
  }

  # INPUTS
  input ServiceInput {
    title: String
    description: String
    cover: String
    callToAction: String
    isOriginal: Boolean
  }

  type Query {
    getBusiness: Business
    getServices(businessId: ID!): [Service]
  }

  type Mutation {
    createService(input: ServiceInput): Service
  }

  # ENUMS
  enum Industries {
    TECH
    ARQUITECTURE
    ACCOUNTANCY
    GAMMING
  }

  enum PricingType {
    FIXED
    BY_TIME
    FREE
  }
`;

export default typeDefs;
