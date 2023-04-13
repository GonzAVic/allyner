import { useRouter } from "next/router";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";
import useService from "utils/useService";
import useBusiness from "utils/useBusiness";

const BusinessApplication = ({ children }) => {
  const router = useRouter();

  const businessRepo = useBusiness(getBusinessId());
  const serviceRepo = useService(getServiceId(router), {
    businessId: businessRepo.business?.id,
  });

  const contextObject = { businessRepo, serviceRepo };

  return (
    <BusinessContext.Provider value={contextObject}>
      {children}
    </BusinessContext.Provider>
  );
};

const getServiceId = (router) => {
  if (router.route === "/app/services/details") {
    return router.query.id;
  }
  if (router.route === "/app/services/in-take-questions") {
    return router.query.id;
  }
};

const getBusinessId = () => {
  return 2;
};

export default BusinessApplication;
