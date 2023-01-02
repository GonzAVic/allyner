import React, { useState } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServiceCard from "components/service/ServiceCard";

export default function Index() {
  return (
    <DefaultLayout title="Good Evening Harman">
      <Typography variant="h5" sx={{ mb: 3 }}>
        Your Services
      </Typography>
      <ServiceCard />
    </DefaultLayout>
  );
}
