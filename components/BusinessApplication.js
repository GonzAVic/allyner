import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";
import useOrder from "utils/useOrder";
import useBusiness from "utils/useBusiness";
import useService from "utils/useService";
import useUser from "utils/useUser";

const BusinessApplication = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const userRepo = useUser(session.user.id);
  const businessRepo = useBusiness(userRepo.user?.businessId);
  const serviceRepo = useService(getServiceId(router), {
    businessId: businessRepo.business?.id,
  });
  const orderRepo = useOrder(null, {
    businessId: userRepo.user?.businessId,
  });

  useEffect(() => {
    if (!userRepo.user) return;
    if (!window.analytics) return;
    if (!window.analytics.identify) return;
    window.analytics.identify(userRepo.user.email, {
      email: userRepo.user.email,
    });
  }, [window.analytics, userRepo.user]);

  const contextObject = { businessRepo, serviceRepo, userRepo, orderRepo };

  if (!businessRepo.business) return "Loading on BusinessApplication";
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

const SessionContainer = ({ children }) => {
  const router = useRouter();
  const sessionData = useSession({
    required: true,
    onUnauthenticated() {
      router.push(`${window.location.origin}/business-signin`);
    },
  });
  const { status } = sessionData;

  if (status === "loading") return "loading BA...";
  return <BusinessApplication>{children}</BusinessApplication>;
};

export default SessionContainer;
