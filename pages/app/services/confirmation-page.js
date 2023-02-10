import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, TextField } from "@mui/material";

// COMPONENTS
import Tiptap from "components/TipTap";
import DefaultLayout from "components/layout/DefaultLayout";
import ServicesTabs from "components/ServicesTabs";
import PreviewContainer from "components/PreviewContainer";
import ServiceCheckout from "components/service/ServiceCheckout";

const Page = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      console.log("-> values: ", values);
    },
  });

  return (
    <DefaultLayout title="Confirmation Page">
      <ServicesTabs />

      <Container>
        <LeftSide>
          <Typography className="section-title" variant="subtitle1">
            Order Confirmation Page
          </Typography>
          <Box className="card" sx={{ mb: 5 }}>
            <Typography variant="subtitle1">Confirmation Headline</Typography>
            <TextField
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />

            <Typography variant="subtitle1">Confirmation Message</Typography>
            <Tiptap onUpdate={() => {}} initialValue={null} />
          </Box>
        </LeftSide>

        <RightSide>
          <PreviewContainer>
            <PreviewContent>
              <ServiceCheckout />
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
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export default Page;
