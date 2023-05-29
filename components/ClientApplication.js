import { useRouter } from "next/router";

// OTHER
import { ClientContext } from "contexts/ClientContext";
import useBusiness from "utils/useBusiness";
import useUser from "utils/useUser";

const ClientApplication = ({ children }) => {
  const router = useRouter();

  const businessRepo = useBusiness(getBusinessId());
  const userRepo = useUser();

  const contextObject = { businessRepo, userRepo };

  return (
    <ClientContext.Provider value={contextObject}>
      {children}
    </ClientContext.Provider>
  );
};

const getBusinessId = () => {
  return 2;
};

export default ClientApplication;
