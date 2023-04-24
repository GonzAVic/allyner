import { gql } from "@apollo/client";

// Fragments
const SERVICE_FRAGMENT = gql`
  fragment ServiceFields on Service {
    id
    title
    description
    callToAction
    cover
    status
  }
`;

// QUERIES
export const GET_SERVICES = gql`
  ${SERVICE_FRAGMENT}
  query ($businessId: ID!) {
    getServices(businessId: $businessId) {
      ...ServiceFields
    }
  }
`;

export const FIND_USER = gql`
  query ($id: Int!) {
    findUser(id: $id) {
      businessId
      createdAt
      email
      firstName
      id
      lastName
      phoneNumber
      role
      updatedAt
      profilePicture
      additionalInfo
      timezone
    }
  }
`;

export const FIND_BUSINESS = gql`
  query ($id: Int!) {
    findBusiness(id: $id) {
      additionalSettings
      createdAt
      id
      name
      updatedAt
      location
      phone
      industry
      logo
      currency
      timezone
    }
  }
`;

export const FIND_SERVICE = gql`
  query ($id: Int!) {
    findService(id: $id) {
      businessId
      createdAt
      description
      id
      name
      updatedAt
      callToAction
      questionsInfo
      pricingAmount
      pricingDuration
      pricingType
      status
      cover
    }
  }
`;

export const FIND_SERVICE_REQUEST = gql`
  query ($id: Int!) {
    findServiceRequest(id: $id) {
      additionalInfo
      businessId
      createdAt
      frozenQuestions
      frozenService
      id
      orderStatusId
      answers
      status
      surveyId
      updatedAt
      userId
    }
  }
`;

export const FIND_BUSINESS_SERVICES = gql`
  query ($businessId: Int!) {
    businessServices(businessId: $businessId) {
      businessId
      callToAction
      cover
      createdAt
      description
      id
      name
      pricingAmount
      pricingDuration
      pricingType
      questionsInfo
      status
      updatedAt
    }
  }
`;

export const FIND_BUSINESS_SERVICE_REQS = gql`
  query ($businessId: Int!) {
    businessServiceRequests(businessId: $businessId) {
      additionalInfo
      answers
      businessId
      createdAt
      frozenQuestions
      frozenService
      id
      status
      updatedAt
      userId
    }
  }
`;

export const FIND_CLIENT_SERVICE_REQS = gql`
  query ($businessId: ID, $userId: ID!) {
    listUserServiceRequests(businessId: $businessId, userId: $userId) {
      additionalInfo
      answers
      businessId
      createdAt
      frozenQuestions
      frozenService
      id
      status
      updatedAt
      userId
    }
  }
`;

// MUTATIONS
export const CREATE_SERVICE = gql`
  mutation ($input: CreateServiceInput!) {
    createService(input: $input) {
      service {
        businessId
        createdAt
        description
        id
        name
        updatedAt
      }
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation ($input: UpdateServiceInput!) {
    updateService(input: $input) {
      service {
        businessId
        createdAt
        description
        id
        name
        updatedAt
        callToAction
        pricingAmount
        pricingDuration
        status
      }
    }
  }
`;

export const UPDATE_BUSINESS = gql`
  mutation ($input: UpdateBusinessInput!) {
    updateBusiness(input: $input) {
      business {
        additionalSettings
        createdAt
        id
        name
        updatedAt
        location
        phone
        industry
        logo
        currency
        timezone
      }
      clientMutationId
    }
  }
`;

export const CREATE_SERVICE_REQUEST = gql`
  mutation ($input: CreateServiceRequestInput!) {
    createServiceRequest(input: $input) {
      serviceRequest {
        additionalInfo
        businessId
        createdAt
        frozenQuestions
        frozenService
        id
        orderStatusId
        status
        surveyId
        updatedAt
        userId
      }
    }
  }
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
  mutation ($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
        profilePicture
      }
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation ($input: UpdateClientInput!) {
    updateClient(input: $input) {
      user {
        createdAt
        email
        firstName
        id
        lastName
        phoneNumber
        role
        updatedAt
        profilePicture
      }
    }
  }
`;
