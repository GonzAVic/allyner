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

export const UPDATE_QUESTIONNAIRE = gql`
  ${SERVICE_FRAGMENT}
  mutation ($input: [QuestionInput], $serviceId: ID!) {
    updateQuestionnaire(input: $input, serviceId: $serviceId) {
      ...ServiceFields
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

export const UPDATE_SERVICE_CHECKOUT = gql`
  ${SERVICE_FRAGMENT}
  mutation ($input: ServiceCheckoutInput, $serviceId: ID!) {
    updateServiceCheckout(input: $input, serviceId: $serviceId) {
      ...ServiceFields
    }
  }
`;
