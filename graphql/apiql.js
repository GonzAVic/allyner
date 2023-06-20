import { gql } from "@apollo/client";

// Fragments
const SERVICE_FRAGMENT = gql`
  fragment ServiceFields on Service {
    id
    name
    cover
    description
    callToAction
    pricingAmount
    pricingDuration
    pricingType
    isActive

    questionnaire
    businessId

    createdAt
    updatedAt
  }
`;

const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    email
    firstname
    lastname
    phoneNumber
    profilePicture
    additionalInfo

    businessId

    updatedAt
    createdAt
  }
`;

const BUSINESS_FRAGMENT = gql`
  fragment BusinessFields on Business {
    id
    name
    logo
    location
    phone
    industry
    currency
    timezone
    additionalData

    updatedAt
    createdAt

    services {
      ...ServiceFields
    }
  }

  ${SERVICE_FRAGMENT}
`;

const ORDER_FRAGMENT = gql`
  fragment OrderFields on Order {
    id
    answers
    status
    frozenQuestionnaire
    frozenService
    additionalInfo

    businessId
    userId

    createdAt
    updatedAt
  }
`;

// QUERIES
export const GET_SERVICES = gql`
  query ($businessId: ID!) {
    getServices(businessId: $businessId) {
      ...ServiceFields
    }
  }

  ${SERVICE_FRAGMENT}
`;

export const FIND_USER = gql`
  query ($userId: String!) {
    findUser(userId: $userId) {
      ...UserFields
    }
  }

  ${USER_FRAGMENT}
`;

export const FIND_BUSINESS = gql`
  query ($businessId: String!) {
    findBusiness(businessId: $businessId) {
      ...BusinessFields
    }
  }

  ${BUSINESS_FRAGMENT}
`;

export const FIND_BUSINESS_BY_NAME = gql`
  query ($businessName: String!) {
    findBusinessByName(businessName: $businessName) {
      ...BusinessFields
    }
  }

  ${BUSINESS_FRAGMENT}
`;

export const FIND_BUSINESS_CUSTOMERS = gql`
  query ($businessId: String!) {
    findBusinessCustomers(businessId: $businessId)
  }
`;

export const FIND_SERVICE = gql`
  ${SERVICE_FRAGMENT}

  query ($serviceId: String!) {
    findService(serviceId: $serviceId) {
      ...ServiceFields
    }
  }
`;

export const FIND_ORDER = gql`
  query ($orderId: String!) {
    findOrder(orderId: $orderId) {
      ...OrderFields
    }
  }

  ${ORDER_FRAGMENT}
`;

export const FIND_BUSINESS_SERVICES = gql`
  ${SERVICE_FRAGMENT}

  query ($businessId: Int!) {
    businessServices(businessId: $businessId) {
      ...ServiceFields
    }
  }
`;

export const FIND_BUSINESS_ORDERS = gql`
  query ($businessId: String!) {
    findBusinessOrders(businessId: $businessId) {
      ...OrderFields
    }
  }

  ${ORDER_FRAGMENT}
`;

export const FIND_CLIENT_ORDERS = gql`
  query ($businessId: String!, $userId: String!) {
    findClientOrders(businessId: $businessId, userId: $userId) {
      ...OrderFields
    }
  }

  ${ORDER_FRAGMENT}
`;

// MUTATIONS
export const CREATE_SERVICE = gql`
  ${SERVICE_FRAGMENT}

  mutation ($input: ServiceInput!) {
    createService(input: $input) {
      ...ServiceFields
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation ($input: ServiceInput!, $serviceId: String!) {
    updateService(input: $input, serviceId: $serviceId) {
      ...ServiceFields
    }
  }

  ${SERVICE_FRAGMENT}
`;

export const UPDATE_BUSINESS = gql`
  mutation ($input: BusinessInput!, $businessId: String!) {
    updateBusiness(input: $input, businessId: $businessId) {
      ...BusinessFields
    }
  }

  ${BUSINESS_FRAGMENT}
`;

export const CREATE_ORDER = gql`
  mutation ($input: OrderInput!) {
    createOrder(input: $input) {
      ...OrderFields
    }
  }

  ${ORDER_FRAGMENT}
`;

export const CREATE_BUSINESS = gql`
  mutation ($input: CreateBusinessInput!) {
    createBusiness(input: $input) {
      business {
        additionalSettings
        createdAt
        id
        name
        updatedAt
      }
    }
  }
`;

export const CREATE_BUSINESS_USER = gql`
  mutation ($input: CreateBusinessUserInput!) {
    createBusinessUser(input: $input) {
      user {
        businessId
        createdAt
        email
        firstName
        id
        lastName
        phoneNumber
        role
        updatedAt
      }
    }
  }
`;

export const CREATE_CLIENT_USER = gql`
  mutation ($input: CreateClientInput!) {
    createClient(input: $input) {
      user {
        createdAt
        email
        firstName
        id
        lastName
        phoneNumber
        role
        updatedAt
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($input: UserInput!, $userId: String) {
    updateUser(input: $input, userId: $userId) {
      ...UserFields
    }
  }

  ${USER_FRAGMENT}
`;

export const DELETE_SERVICE = gql`
  ${SERVICE_FRAGMENT}

  mutation ($input: DeleteServiceInput!) {
    deleteService(input: $input) {
      service {
        ...ServiceFields
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation ($input: OrderInput!, $orderId: String!) {
    updateOrder(input: $input, orderId: $orderId) {
      ...OrderFields
    }
  }

  ${ORDER_FRAGMENT}
`;
