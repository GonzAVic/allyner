import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";

export default function Home() {
  return (
    <DefaultLayout title={"Service name"}>
      <Button variant="secondary" onClick={() => signIn()}>
        Log in
      </Button>
    </DefaultLayout>
  );
}

const Container = styled("div")({
  marginTop: 16,
  borderRadius: 12,
  border: "1px solid #DCDFEA",
  display: "flex",
  overflow: "hidden",
});

const LeftSide = styled("div")({
  padding: 16,
  flex: 1,
});

const RightSide = styled("div")({
  flex: 1,
  borderLeft: "1px solid #DCDFEA",
});
