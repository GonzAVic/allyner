import { useMutation } from "@apollo/client";

// OTHER
import { CREATE_BUSINESS_USER, CREATE_CLIENT_USER } from "graphql/apiql";

const useUser = () => {
  const [createBusinessUserFn, createBusinessUserHpr] =
    useMutation(CREATE_BUSINESS_USER);
  const [createClientUserFn, createClientUserHpr] =
    useMutation(CREATE_CLIENT_USER);

  const createBusinessUser = (data) => {
    createBusinessUserFn({
      variables: { input: { attributes: data } },
    });
  };

  const createClientUser = (data) => {
    createClientUserFn({
      variables: { input: { attributes: data } },
    });
  };

  return { createBusinessUser, createClientUser };
};

export default useUser;
