import { useContext } from "react";

// COMPONENTS
import ClearLayout from "components/layout/ClearLayout";
import ClientSignin from "components/ClientSignin";

// OTHER
import { ClientContext } from "contexts/ClientContext";

const Page = () => {
  const { businessRepo } = useContext(ClientContext);
  const { business } = businessRepo;
  return (
    <ClearLayout>
      <ClientSignin
        headline={business?.additionalSettings.signInHeadline}
        message={business?.additionalSettings.signInMessage}
      />
    </ClearLayout>
  );
};

export default Page;
