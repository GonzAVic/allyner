// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField } from "@mui/material";

import DefaultLayout from "components/layout/DefaultLayout";

export default function Home() {
  return (
    <DefaultLayout
      title="Services"
      secondaryText="Keep track of services and their status."
    >
      <Card>
        <Typography variant="label">Title</Typography>
        <TextField label="label" sx={{ mb: 2 }} />
      </Card>
    </DefaultLayout>
  );
}

const Card = styled("div")({
  padding: 24,
  border: "1px solid #DCDFEA",
  borderRadius: 12,
});
