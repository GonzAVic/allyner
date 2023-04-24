import { useState } from "react";

const withSession = (WrappedComponent) => {
  const WithSession = () => {
    const [user, setUser] = useState(null);

    const updateUser = (data) => {
      const prevValues = user ? user : {};
      setUser({ ...prevValues, ...data });
    };

    return <WrappedComponent user={user} updateUser={updateUser} />;
  };

  return WithSession;
};

export default withSession;
