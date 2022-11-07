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
