// MATERIAL UI
import { styled } from "@mui/system";
import { TextField } from "@mui/material";

// COMPONENTS
import Card from "components/Card";
import ServicePreview from "components/ServicePreview";
import DefaultLayout from "components/layout/DefaultLayout";

export default function Home() {
  return (
    <DefaultLayout title="Product Management">
      <Container>
        <LeftSide>
          <Card title="Title">
            <TextField label="label" sx={{ mb: 2 }} />
          </Card>
          <Card title="Description">
            <TextField label="label" sx={{ mb: 2 }} />
          </Card>
          <Card title="Avatar">
            <TextField label="label" sx={{ mb: 2 }} />
          </Card>
          <Card title="CTA">
            <TextField sx={{ mb: 2 }} />
          </Card>
          <Card title="Pricing">
            <TextField label="label" sx={{ mb: 2 }} />
          </Card>
        </LeftSide>
        <RightSide>
          <ServicePreview />
        </RightSide>
      </Container>
    </DefaultLayout>
  );
}

const Container = styled("div")({
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
