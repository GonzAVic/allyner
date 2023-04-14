import { useContext } from "react";

// COMPONENTS
import ClearLayout from "components/layout/ClearLayout";
import ClientSignup from "components/ClientSignup";

// OTHER
import useUser from "utils/useUser";
import { ClientContext } from "contexts/ClientContext";

const Page = () => {
  const { businessRepo } = useContext(ClientContext);
  const { business } = businessRepo;
  const { createClientUser } = useUser(3);

  const handleSubmit = (data) => {
    if (!business || !business.id) return;
    createClientUser({
      firstName: "string",
      lastName: "string",
      email: data.email,
      businessId: Number(business.id),
    });
  };

  return (
    <ClearLayout>
      <ClientSignup
        headline={business?.additionalSettings.signUpHeadline}
        message={business?.additionalSettings.signUpMessage}
        additionalQuestions={
          business ? business.additionalSettings.signUpQuestionnaire || [] : []
        }
        onSubmit={handleSubmit}
      />
    </ClearLayout>
  );
};

export default Page;
