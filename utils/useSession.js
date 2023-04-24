import { useState } from "react";

const useSession = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ id: 16 });

  const updateUser = (data) => {
    const prevValue = user ? user : {};
    setUser({ ...prevValue, ...data });
  };

  return {
    token: "token value",
    user,

    updateUser,
  };
};

export default useSession;
