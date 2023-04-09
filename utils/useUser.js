import { useEffect, useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";

// OTHER
import {
  CREATE_BUSINESS_USER,
  CREATE_CLIENT_USER,
  FIND_USER,
  UPDATE_USER,
} from "graphql/apiql";

const useUser = (userId) => {
  const [createBusinessUserFn, createBusinessUserHpr] =
    useMutation(CREATE_BUSINESS_USER);
  const [createClientUserFn, createClientUserHpr] =
    useMutation(CREATE_CLIENT_USER);
  const [updateUserFn, updateUserHpr] = useMutation(UPDATE_USER);
  const [findUserFn, findUserHpr] = useLazyQuery(FIND_USER);

  const [user, setUser] = useState(null);

  const findUser = () => {
    findUserFn({ variables: { id: Number(userId) } });
  };

  useEffect(() => {
    if (!userId) return;
    findUser(userId);
  }, [userId]);

  useEffect(() => {
    if (!findUserHpr.called) return;
    if (!findUserHpr.data) return;

    const user = findUserHpr.data.findUser;
    const userCreatedAt = new Date(user.createdAt);
    user.createdAt = `${userCreatedAt.getDate()}/${userCreatedAt.getMonth()}/${userCreatedAt.getFullYear()}`;
    setUser(user);
  }, [findUserHpr]);

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

  const updateUser = (data) => {
    updateUserFn({
      // TODO: remove this after handling name
      variables: {
        input: {
          attributes: { ...data, lastName: "lastname value" },
          id: Number(userId),
        },
      },
    });
  };

  return { createBusinessUser, createClientUser, user, updateUser };
};

export default useUser;
