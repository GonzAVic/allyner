import { gql } from "apollo-server-micro";

const typeDefs = gql`
  # MODELS
  type Business {
    id: ID!
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
    status: ServiceStatus!
    isOriginal: Boolean!

    pricing: Pricing!
    questionnaire: [Question]!
    # businessId: ID!
  }

  type Pricing {
    id: ID!
    type: PricingType!
    durationHours: Int
    durationMinutes: Int
    amount: Int!
    isOriginal: Boolean!
  }

  type Question {
    id: ID!
    type: QuestionType!
    value: String!
    options: [String]
    isMultiple: Boolean!
    isRequired: Boolean!
    isOriginal: Boolean!
  }

  # INPUTS
  input ServiceInput {
    title: String
    description: String
    cover: String
    callToAction: String
    isOriginal: Boolean

    # Pricing
    pricing: PricingInput!
  }

  input PricingInput {
    type: PricingType!
    durationHours: Int
    durationMinutes: Int
    amount: Int!
  }

  # TODO: validate required attributes
  input QuestionInput {
    id: ID!
    type: QuestionType
    sentence: String
    description: String
    options: [String]
    isMultiple: Boolean!
    isRequired: Boolean!
  }

  input QuestionResponseInput {
    id: ID!
  }

  type Query {
    getBusiness: Business
    getServices(businessId: ID!): [Service]
    getService(serviceId: ID!): Service
  }

  type Mutation {
    createService(input: ServiceInput): Service
    updateQuestionnaire(input: [QuestionInput], serviceId: ID!): Service
  }

  # ENUMS
  enum Industries {
    TECH
    ARQUITECTURE
    ACCOUNTANCY
    GAMMING
  }

  enum QuestionType {
    DROPDOWN
    MULTIPLE
    PICTURE
    SHORT_TEXT
    LONG_TEXT
    FILE
    DATE
  }

  enum ServiceStatus {
    UNPUBLISHED
    ACTIVE
  }

  enum PricingType {
    FIXED
    BY_TIME
    FREE
  }
`;

export default typeDefs;
