import React from "react";
import { useSession } from "next-auth/react";

const BusinessHOC = ({ children }) => {
  const { data: session } = useSession();

  console.log("-> session: ", session);

  // if (session === undefined) {
  //   return <div>Loading...</div>;
  // } else if (session === null)
  //   return <div>You do not have access to this screen</div>;
  // else return <div>{children}</div>;
  return <div>{children}</div>;
};

export default BusinessHOC;
