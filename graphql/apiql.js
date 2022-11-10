import { gql } from "@apollo/client";

// QUERIES
export const GET_SERVICES = gql`
  query ($businessId: ID!) {
    getServices(businessId: $businessId) {
      id
      title
      description
      callToAction
      cover
      status
    }
  }
`;

export const GET_SERVICE = gql`
  query ($serviceId: ID!) {
    getService(serviceId: $serviceId) {
      id
      title
      description
      callToAction
      cover
      status

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
  mutation ($input: ServiceInput) {
    createService(input: $input) {
      id
      title
      description
      callToAction
      cover
      isOriginal
    }
  }
`;

export const UPDATE_QUESTIONNAIRE = gql`
  mutation ($input: [QuestionInput], $serviceId: ID!) {
    updateQuestionnaire(input: $input, serviceId: $serviceId) {
      id
    }
  }
`;

export const UPDATE_SERVICE_DETAILS = gql`
  mutation ($input: ServiceInput, $serviceId: ID!) {
    updateServiceDetails(input: $input, serviceId: $serviceId) {
      id
    }
  }
`;

export const UPDATE_SERVICE_CHECKOUT = gql`
  mutation ($input: ServiceCheckoutInput, $serviceId: ID!) {
    updateServiceCheckout(input: $input, serviceId: $serviceId) {
      id
    }
  }
`;
