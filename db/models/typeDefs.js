import { gql } from "apollo-server-micro";

const typeDefs = gql`
  # MODELS
  type User {
    id: ID!
    email: String!
    type: String
  }

  type BUser {
    id: ID!
    email: String!
    name: String!
    lastName: String!
    companyName: String!
  }

  type CUser {
    id: ID!
    email: String!
  }

  type Business {
    id: ID!
    name: String!
    industry: String!

    # owner: ID!
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

    checkoutTitle: String!
    checkoutMessage: String!
    isGuestCheckoutEnabled: Boolean!

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
    sentence: String!
    description: String!
    type: QuestionType!
    value: String!
    options: [String]
    withDescription: Boolean!
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

    pricing: PricingInput!
  }

  input ServiceCheckoutInput {
    checkoutTitle: String
    checkoutMessage: String
    isGuestCheckoutEnabled: Boolean
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
    withDescription: Boolean!
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
    updateServiceDetails(input: ServiceInput, serviceId: ID!): Service
    updateQuestionnaire(input: [QuestionInput], serviceId: ID!): Service
    updateServiceCheckout(input: ServiceCheckoutInput, serviceId: ID!): Service
  }

  # ENUMS

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
    DRAFT
    ACTIVE
  }

  enum PricingType {
    FIXED
    BY_TIME
    FREE
  }
`;

export default typeDefs;
