import { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

// COMPONENTS
import ClearLayout from "components/layout/ClearLayout";
import ClientSignup from "components/ClientSignup";

// OTHER
import useBusiness from "utils/useBusiness";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { business } = useBusiness("6483b7aa76172f4cb7a5d976");

  useEffect(() => {
    console.log("-> status: ", status);
    if (status === "authenticated")
      router.push(`${window.location.origin}/app`);
  }, [status]);

  const handleSubmit = async (data) => {
    console.log("-> data: ", data);
    if (!business || !business.id) return;

    const userData = {
      email: data.email,
      password: data.password,
      firstname: "data.firsname",
      lastname: data.lastname,
      businessId: "6483b8c176172f4cb7a5d9df",
      userType: "CLIENT",
    };
    const res = await signIn("credentials", {
      redirect: false,
      email: JSON.stringify({ userData }),
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
