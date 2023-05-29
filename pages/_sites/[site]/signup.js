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
  const { createClientUser } = useUser();

  const handleSubmit = async (data) => {
    console.log("-> data: ", data);
    if (!business || !business.id) return;
    const userData = {
      email: "r92@example.com",
      password: "3N@1234",
      first_name: "raaz",
      last_name: "Khan",
      business_id: 1,
      role: "business_user",
      phone_number: "123456789",
      timezone: "America/New York",
    };
    const response = await fetch(
      "https://allyner-api-dev.herokuapp.com/users/",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(userData),
      }
    );
    console.log("-> response: ", response);
    // createClientUser({
    //   firstName: "string",
    //   lastName: "string",
    //   email: data.email,
    //   businessId: Number(business.id),
    // });
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
