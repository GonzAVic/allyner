import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// OTHER
import { ClientContext } from "contexts/ClientContext";
import useBusiness from "utils/useBusiness";
import useOrder from "utils/useOrder";
import useUser from "utils/useUser";

const ClientApplication = ({ children }) => {
  const { data: session } = useSession();

  const router = useRouter();

  const userRepo = useUser(session.user.id);
  const businessRepo = useBusiness(null, { useBusinessName: true });
  const orderRepo = useOrder(null, {
    userId: session.user.id,
    businessId: businessRepo?.business?.id,
  });

  const contextObject = { businessRepo, userRepo, orderRepo };

  if (!userRepo.user) return "Loading on ClientApplication";
  return (
    <ClientContext.Provider value={contextObject}>
      {children}
    </ClientContext.Provider>
  );
};

const SessionContainer = ({ children }) => {
  const { data: session, status } = useSession();

  const router = useRouter();

  // console.log("-> router: ", router);
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     if (router.pathname !== "/_sites/[site]/signin") router.push("/signin");
  //   }
  // }, [status]);

  if (status === "loading") return "loading...";
  else if (status === "authenticated")
    return <ClientApplication>{children}</ClientApplication>;
};

export default SessionContainer;
