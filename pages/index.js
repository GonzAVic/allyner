import React from "react";
import { signIn, signOut } from "next-auth/react";

// MATERIAL UI
import { Button } from "@mui/material";

const EMAIL = "r9qq2sdasdweqwedasda@example.com";

export default function Home() {
  const handleSubmit = async () => {
    const userData = {
      email: EMAIL,
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    console.log("-> response: ", response);
  };

  const pedro = async () => {
    const userData = {
      email: EMAIL,
      password: "3N@1234",
    };
    const response = await fetch(
      "https://allyner-api-dev.herokuapp.com/users/sign_in",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
  };

  const nextAuthSignin = async () => {
    const credentialsPayload = {
      email: "victor@gmail.com",
      password: "123456",
      businessId: "56cb91bdc3464f14678934ca",
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
    <div>
      <Button variant="secondary" onClick={() => handleSubmit()}>
        Sign up
      </Button>
      <Button variant="secondary" onClick={pedro}>
        Sign in
      </Button>
      <Button variant="secondary" onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
}
