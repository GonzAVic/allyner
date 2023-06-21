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

  const { business } = useBusiness(null, {
    useBusinessName: true,
  });

  useEffect(() => {
    if (status === "authenticated")
      router.push(`${window.location.origin}/dashboard`);
  }, [status]);

  const handleSubmit = async (data) => {
    if (!business || !business.id) return;

    const userData = {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      businessId: business.id,
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
