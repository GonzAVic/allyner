import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";

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

  return (
    <div>
      <Button variant="secondary" onClick={() => handleSubmit()}>
        Sign up
      </Button>
      <Button variant="secondary" onClick={() => pedro()}>
        Sign in
      </Button>
    </div>
  );
}
