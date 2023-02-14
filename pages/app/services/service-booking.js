// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField, IconButton } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServicesTabs from "components/ServicesTabs";
import PreviewContainer from "components/PreviewContainer";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";

const Page = () => {
  return (
    <DefaultLayout title="Service Booking">
      <ServicesTabs />

      <Container>
        <LeftSide>
          <Typography className="section-title" variant="subtitle1">
            Order Status
          </Typography>

          <Status />
        </LeftSide>

        <RightSide>
          <PreviewContainer>LALALA</PreviewContainer>
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

const Status = () => {
  return (
    <SContainer className="card">
      <DragIndicatorIcon />
      <TextField value="Todo" />
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </SContainer>
  );
};

const SContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,
});

export default Page;
