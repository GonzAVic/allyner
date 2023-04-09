// COMPONENTS
import ClearLayout from "components/layout/ClearLayout";
import ClientSignin from "components/ClientSignin";

// OTHER
import useBusiness from "utils/useBusiness";

const Page = () => {
  const { business } = useBusiness();
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
