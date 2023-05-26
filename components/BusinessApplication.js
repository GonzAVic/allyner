import { useRouter } from "next/router";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";
import useService from "utils/useService";
import useBusiness from "utils/useBusiness";
import useUser from "utils/useUser";

const BusinessApplication = ({ children }) => {
  const router = useRouter();

  const userRepo = useUser();
  const businessRepo = useBusiness(userRepo.user?.businessId);
  const serviceRepo = useService(getServiceId(router), {
    businessId: businessRepo.business?.id,
  });

  const contextObject = { businessRepo, serviceRepo, userRepo };

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

export default BusinessApplication;
