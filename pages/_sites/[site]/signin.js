import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

// COMPONENTS
import ClearLayout from "components/layout/ClearLayout";
import ClientSignin from "components/ClientSignin";

// OTHER
import useBusiness from "utils/useBusiness";

const Page = () => {
  const router = useRouter();

  const businessRepo = useBusiness("6483b8c176172f4cb7a5d9df");
  const { business } = businessRepo;

  const handleSubmit = async (data) => {};

  return (
    <ClearLayout>
      <ClientSignin
        headline={business?.additionalData.signInHeadline}
        message={business?.additionalData.signInMessage}
        onSubmit={handleSubmit}
        onSignup={() => router.push("/signup")}
      />
    </ClearLayout>
  );
};

export default Page;
