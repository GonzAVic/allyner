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

export const GET_SERVICE = gql`
  ${SERVICE_FRAGMENT}
  query ($serviceId: ID!) {
    getService(serviceId: $serviceId) {
      ...ServiceFields

      pricing {
        id
        type
        durationHours
        durationMinutes
        amount
        isOriginal
      }

      questionnaire {
        id
        type
        sentence
        description
        withDescription
        options
        isMultiple
        isRequired
      }

      checkoutTitle
      checkoutMessage
      isGuestCheckoutEnabled
    }
  }
`;

// MUTATIONS
export const CREATE_SERVICE = gql`
  ${SERVICE_FRAGMENT}
  mutation ($input: ServiceInput) {
    createService(input: $input) {
      ...ServiceFields
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

export const UPDATE_SERVICE_DETAILS = gql`
  ${SERVICE_FRAGMENT}
  mutation ($input: ServiceInput, $serviceId: ID!) {
    updateServiceDetails(input: $input, serviceId: $serviceId) {
      ...ServiceFields
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
