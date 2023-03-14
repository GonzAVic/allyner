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

export const FIND_BUSINESS = gql`
  query ($id: Int!) {
    findBusiness(id: $id) {
      additionalSettings
      createdAt
      description
      id
      name
      updatedAt
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
      status
      surveyId
      updatedAt
      userId
    }
  }
`;

export const LIST_QUESTIONS = gql`
  query ($serviceId: ID!) {
    listQuestions(serviceId: $serviceId) {
      businessId
      createdAt
      description
      id
      isDescriptionActive
      isRequired
      options
      order
      questionType
      surveyId
      title
      updatedAt
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

export const CREATE_QUESTION = gql`
  mutation ($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      question {
        businessId
        createdAt
        description
        id
        isDescriptionActive
        isRequired
        questionType
        title
        updatedAt
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
        description
        id
        name
        updatedAt
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
