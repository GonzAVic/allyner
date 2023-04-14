import { useRouter } from "next/router";

// OTHER
import { ClientContext } from "contexts/ClientContext";
import useBusiness from "utils/useBusiness";

const ClientApplication = ({ children }) => {
  const router = useRouter();

  const businessRepo = useBusiness(getBusinessId());

  const contextObject = { businessRepo };

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
