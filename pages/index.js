import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import { TextField, Button, MenuItem } from "@mui/material";

// COMPONENTS
import Card from "components/Card";
import ServicePreview from "components/ServicePreview";
import DefaultLayout from "components/layout/DefaultLayout";

const PRICING_TYPES = [
  {
    value: "FIXED",
    label: "Flat Pricing",
  },
  {
    value: "BY_TIME",
    label: "Price by time",
  },
  {
    value: "FREE",
    label: "Free",
  },
];

export default function Home() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      cover: "",
      callToAction: "",

      pricingType: "FREE",
      pricingDurationHours: "",
      pricingDurationMinutes: "",
      pricingAmount: "",
      pricingIsFree: false,
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      console.log("-> values: ", values);
    },
  });

  return (
    <DefaultLayout title={formik.values.title || "Service name"}>
      <Container>
        <LeftSide>
          <form onSubmit={formik.handleSubmit}>
            <Card title="Title">
              <TextField
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                sx={{ mb: 2 }}
              />
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
              <TextField
                label="Pricing Type"
                name="pricingType"
                value={formik.values.pricingType}
                onChange={formik.handleChange}
                select
              >
                {PRICING_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Price"
                name="pricingAmount"
                value={formik.values.pricingAmount}
                onChange={formik.handleChange}
                type="number"
                sx={{ mb: 2 }}
              />
            </Card>
            <Button fullWidth type="submit">
              Save
            </Button>
          </form>
        </LeftSide>
        <RightSide>
          <ServicePreview title={formik.values.title || "Service name"} />
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
