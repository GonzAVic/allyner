// COMPONENTS
import ClearLayout from "components/layout/ClearLayout";
import ClientSignup from "components/ClientSignup";

// OTHER
import useUser from "utils/useUser";
import useBusiness from "utils/useBusiness";

const Page = () => {
  const { business } = useBusiness();
  const { createClientUser } = useUser(3);

  const handleSubmit = (data) => {
    console.log("-> data: ", data);
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
