import { gql } from "apollo-server-micro";

const typeDefs = gql`
  # MODELS
  type User {
    id: ID!
    email: String
    firstname: String
    lastname: String
    phoneNumber: String
    profilePicture: String
    additionalInfo: String
    userType: String

    businessId: String

    createdAt: String
    updatedAt: String
  }

  type Business {
    id: ID!
    name: String
    logo: String
    location: String
    phone: String
    industry: String
    currency: String
    timezone: String
    subdomain: String
    additionalData: String

    createdAt: String
    updatedAt: String

    services: [Service]
  }

  type Service {
    id: ID!
    name: String
    cover: String
    description: String
    callToAction: String
    pricingAmount: Int
    pricingDuration: Int
    pricingType: String
    isActive: Boolean

    questionnaire: String
    businessId: String

    createdAt: String
    updatedAt: String
  }

  type Order {
    id: ID!
    additionalInfo: String
    businessId: String
    frozenQuestionnaire: String
    frozenService: String
    answers: String
    status: String
    userId: String

    createdAt: String
    updatedAt: String
  }

  input UserInput {
    email: String
    firstname: String
    lastname: String
    phoneNumber: String
    profilePicture: String
    additionalInfo: String
    userType: String
    businessId: String
  }

  input BusinessInput {
    name: String
    logo: String
    location: String
    phone: String
    industry: String
    currency: String
    timezone: String
    subdomain: String
    additionalData: String
  }

  input ServiceInput {
    name: String
    cover: String
    description: String
    callToAction: String
    pricingAmount: Int
    pricingDuration: Int
    pricingType: String
    isActive: Boolean

    questionnaire: String
    businessId: String
  }

  input OrderInput {
    additionalInfo: String
    businessId: String
    frozenQuestionnaire: String
    frozenService: String
    answers: String
    status: String
    userId: String

    createdAt: String
    updatedAt: String
  }

  type Query {
    findUser(userId: String!): User

    findBusiness(businessId: String!): Business
    findBusinessBySubdomain(businessSubdomain: String!): Business
    findBusinessCustomers(businessId: String!): String

    findService(serviceId: String!): Service

    findBusinessOrders(businessId: String!): [Order]
    findClientOrders(businessId: String!, userId: String!): [Order]
    findOrder(orderId: String!): Order
  }

  type Mutation {
    updateUser(input: UserInput, userId: String): User

    createBusiness(input: BusinessInput!): Business
    updateBusiness(input: BusinessInput!, businessId: String!): Business

    createService(input: ServiceInput!): Service
    updateService(input: ServiceInput!, serviceId: String!): Service

    createOrder(input: OrderInput!): Order
    updateOrder(input: OrderInput!, orderId: String!): Order
  }
`;

export default typeDefs;
