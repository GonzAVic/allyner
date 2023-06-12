import { signIn } from "next-auth/react";

// COMPONENTS
import ClearLayout from "components/layout/ClearLayout";
import ClientSignup from "components/ClientSignup";

// OTHER
import useBusiness from "utils/useBusiness";

const Page = () => {
  const { business } = useBusiness();

  const handleSubmit = async (data) => {
    if (!business || !business.id) return;

    const credentialsPayload = {
      email: "victor@gmail.com",
      password: "123456",
      userType: "CLIENT",
    };

    const res = await signIn("credentials", {
      redirect: false,
      email: JSON.stringify(credentialsPayload),
      password: "---",
      callbackUrl: `${window.location.origin}`,
    });
    console.log("-> res: ", res);
  };

  return (
    <ClearLayout>
      <ClientSignup
        headline={business?.additionalData.signUpHeadline}
        message={business?.additionalData.signUpMessage}
        additionalQuestions={
          business ? business.additionalData.signUpQuestionnaire || [] : []
        }
        onSubmit={handleSubmit}
      />
    </ClearLayout>
  );
};

export default Page;
