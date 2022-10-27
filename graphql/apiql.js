import { gql } from "@apollo/client";

export const CREATE_SERVICE = gql`
  mutation ($input: ServiceInput) {
    createService(input: $input) {
      callToAction
    }
  }
`;
