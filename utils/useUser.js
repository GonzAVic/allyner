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

const useUser = (userId) => {
  const [createBusinessUserFn] = useMutation(CREATE_BUSINESS_USER);
  const [createClientUserFn] = useMutation(CREATE_CLIENT_USER);
  const [updateUserFn, updateUserHpr] = useMutation(UPDATE_USER);
  const [findUserFn, findUserHpr] = useLazyQuery(FIND_USER);

  const [user, setUser] = useState(null);

  const findUser = () => {
    findUserFn({ variables: { userId } });
  };

  useEffect(() => {
    if (!userId) return;
    findUser();
  }, [userId]);

  useEffect(() => {
    if (!findUserHpr.called) return;
    if (!findUserHpr.data) return;

    const user = findUserHpr.data.findUser;
    const userCreatedAt = new Date(Number(user.createdAt));
    user.createdAt = `${userCreatedAt.getDate()}/${userCreatedAt.getMonth()}/${userCreatedAt.getFullYear()}`;
    user.additionalInfo = JSON.parse(user.additionalInfo);
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

  const updateUser = (data_) => {
    const data = { ...data_ };
    if (typeof data.additionalInfo !== "string" && !!data.additionalInfo) {
      console.log("-> data.additionalInfo: ", data.additionalInfo);
      data.additionalInfo = JSON.stringify(data.additionalInfo);
    }
    console.log("-> data: ", data);
    updateUserFn({
      variables: {
        input: data,
        userId,
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
    getSession,
  };
};

export default useUser;
