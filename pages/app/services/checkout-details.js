// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServicesTabs from "components/ServicesTabs";
import PreviewContainer from "components/PreviewContainer";

const Page = () => {
  return (
    <DefaultLayout title="Checkout Details">
      <ServicesTabs />

      <Container>
        <LeftSide>
          <Typography className="section-title" variant="subtitle1">
            Checkout Details
          </Typography>

          <Typography className="section-title" variant="subtitle1">
            Order Details
          </Typography>
        </LeftSide>

        <RightSide>
          <PreviewContainer>Almost There</PreviewContainer>
        </RightSide>
      </Container>
    </DefaultLayout>
  );
};

const Container = styled("div")({
  display: "flex",
  gap: 32,
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

const LeftSide = styled("div")({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

const RightSide = styled("div")({
  display: "flex",
  flex: 1,
});

export default Page;
