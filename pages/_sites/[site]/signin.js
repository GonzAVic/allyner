import { useContext } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import ClearLayout from "components/layout/ClearLayout";
import ClientSignin from "components/ClientSignin";

// OTHER
import { ClientContext } from "contexts/ClientContext";
import useUser from "utils/useUser";

const Page = () => {
  const router = useRouter();

  const { businessRepo } = useContext(ClientContext);
  const { business } = businessRepo;

  const { getSession } = useUser();

  const handleSubmit = async (data) => {
    await getSession({
      email: "r9qq2sdasdweqwedasda@example.com",
      password: "3N@1234",
    });
    router.push("/dashboard");
  };

  return (
    <ClearLayout>
      <ClientSignin
        headline={business?.additionalSettings.signInHeadline}
        message={business?.additionalSettings.signInMessage}
        onSubmit={handleSubmit}
      />
    </ClearLayout>
  );
};

export default Page;
