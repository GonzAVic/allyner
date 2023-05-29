import { useEffect, useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";

// OTHER
import {
  CREATE_BUSINESS_USER,
  CREATE_CLIENT_USER,
  FIND_USER,
  UPDATE_USER,
  UPDATE_CLIENT,
} from "graphql/apiql";

import { getFileUrl } from "utils/utils";

const useUser = (userID) => {
  const [createBusinessUserFn] = useMutation(CREATE_BUSINESS_USER);
  const [createClientUserFn] = useMutation(CREATE_CLIENT_USER);
  const [updateUserFn, updateUserHpr] = useMutation(UPDATE_USER);
  const [updateClientFn, updateClientHrp] = useMutation(UPDATE_CLIENT);
  const [findUserFn, findUserHpr] = useLazyQuery(FIND_USER);

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const findUser = (userId) => {
    findUserFn({ variables: { id: Number(userId) } });
  };

  useEffect(() => {
    const lsUserId = localStorage.getItem("userId");
    if (lsUserId) setUserId(lsUserId);
  }, []);

  useEffect(() => {
    if (userID) findUser(userID);
    else if (userId) findUser(userId);
  }, [userId, userID]);

  useEffect(() => {
    if (!findUserHpr.called) return;
    if (!findUserHpr.data) return;

    const user = findUserHpr.data.findUser;
    const userCreatedAt = new Date(user.createdAt);
    user.createdAt = `${userCreatedAt.getDate()}/${userCreatedAt.getMonth()}/${userCreatedAt.getFullYear()}`;
    user.profilePicture = getFileUrl(user.profilePicture);
    setUser(user);
  }, [findUserHpr]);

  useEffect(() => {
    if (!updateUserHpr.called) return;
    if (!updateUserHpr.data) return;

    location.reload();
  }, [updateUserHpr]);

  const createBusinessUser = async (data) => {
    const response = await createBusinessUserFn({
      variables: { input: { attributes: data } },
    });
    return response.data.createBusinessUser.user;
  };

  const createClientUser = async (data) => {
    const response = await createClientUserFn({
      variables: { input: { attributes: data } },
    });
    return response;
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

  const updateClient = (data) => {
    updateClientFn({
      // TODO: remove this after handling name
      variables: {
        input: {
          attributes: { ...data, lastName: "lastname value" },
          id: Number(userId),
        },
      },
    });
  };

  const getSession = async ({ email, password }) => {
    const userData = {
      email,
      password,
    };
    const response = await fetch(
      "https://allyner-api-dev.herokuapp.com/users/sign_in",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const jsonData = await response.json();
    localStorage.setItem("access-token", jsonData["access-token"]);
    localStorage.setItem("uid", jsonData["uid"]);
    localStorage.setItem("clientId", jsonData["client"]);
    localStorage.setItem("userId", jsonData.user.id);
    return jsonData;
  };

  return {
    createBusinessUser,
    createClientUser,
    user,
    updateUser,
    updateClient,
    getSession,
  };
};

export default useUser;
