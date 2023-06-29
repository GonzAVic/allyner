import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

// COMPONENTS
import ClearLayout from "components/layout/ClearLayout";
import ClientSignin from "components/ClientSignin";

// OTHER
import useBusiness from "utils/useBusiness";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isDisplayError, setIsDisplayError] = useState(false);

  const businessRepo = useBusiness(null, {
    useBusinessName: true,
  });
  const { business } = businessRepo;

  useEffect(() => {
    if (status === "authenticated")
      router.push(`${window.location.origin}/dashboard`);
  }, [status]);

  const handleSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      businessId: business.id,
      userType: "CLIENT",
    };

    const res = await signIn("credentials", {
      redirect: false,
      email: JSON.stringify({ userData, action: "SIGNIN" }),
      password: "---",
      callbackUrl: `${window.location.origin}/app`,
    });

    if (res.error) setIsDisplayError(true);
  };

  return (
    <ClearLayout>
      {business && (
        <ClientSignin
          headline={business?.additionalData.signInHeadline}
          message={business?.additionalData.signInMessage}
          onSubmit={handleSubmit}
          onSignup={() => router.push("/signup")}
          isDisplayError={isDisplayError}
        />
      )}
    </ClearLayout>
  );
};

export default Page;
