import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, TextField, Button } from "@mui/material";

// COMPONENTS
import Tiptap from "components/TipTap";
import DefaultLayout from "components/layout/DefaultLayout";
import ServicesTabs from "components/ServicesTabs";
import PreviewContainer from "components/PreviewContainer";
import CheckoutQuestionCard from "components/CheckoutQuestionCard";
import PedroPreview from "components/service/PedroPreview";

const Page = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      headline: "",
      messgage: "",
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      console.log("-> values: ", values);
    },
  });

  const handleCoverChange = () => {};

  return (
    <DefaultLayout title="Service Booking">
      <ServicesTabs />

      <Container>
        <LeftSide>
          <Typography className="section-title" variant="subtitle1">
            Checkout Headline
          </Typography>
          <Box className="card" sx={{ mb: 5 }}>
            <Typography variant="subtitle1">Checkout Headline</Typography>
            <TextField
              name="headline"
              value={formik.values.headline}
              onChange={formik.handleChange}
            />
            <Typography variant="subtitle1">Checkout Message</Typography>
            <TextField
              name="messgage"
              value={formik.values.messgage}
              onChange={formik.handleChange}
              multiline
              rows={3}
              maxRows={5}
            />
          </Box>

          <Typography className="section-title" variant="subtitle1">
            Other Details
          </Typography>
          <CheckoutQuestionCard />
          <Button variant="dashed" fullWidth>
            Add new field
          </Button>
        </LeftSide>

        {/**** RIGHT SIDE ****/}
        <RightSide>
          <PreviewContainer>
            <PreviewContent>
              <PedroPreview />
            </PreviewContent>
          </PreviewContainer>
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

const PreviewContent = styled("div")({
  marginTop: 150,
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export default Page;
