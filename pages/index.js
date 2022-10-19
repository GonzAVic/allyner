import { useFormik } from "formik";

// MATERIAL UI
import { styled } from "@mui/system";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  InputAdornment,
} from "@mui/material";

// COMPONENTS
import Card from "components/Card";
import Tiptap from "components/TipTap";
import ServicePreview from "components/ServicePreview";
import DefaultLayout from "components/layout/DefaultLayout";

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

  const handleDescriptionChange = (value) => {
    formik.setFieldValue("description", value);
  };

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
              />
            </Card>

            <Card title="Description">
              <Tiptap onUpdate={handleDescriptionChange} />
            </Card>

            <Card title="Avatar">
              <TextField label="label" />
            </Card>

            <Card title="CTA">
              <TextField />
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

              <Box className="row-2" sx={{ alignItems: "flex-end" }}>
                <TextField
                  label="Duration"
                  name="pricingDurationHours"
                  value={formik.values.pricingDurationHours}
                  onChange={formik.handleChange}
                  select
                >
                  {PRICE_DURATION_HOURS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  name="pricingDurationMinutes"
                  value={formik.values.pricingDurationMinutes}
                  onChange={formik.handleChange}
                  select
                >
                  {PRICE_DURATION_MINUTES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <TextField
                label="Price"
                name="pricingAmount"
                value={formik.values.pricingAmount}
                onChange={formik.handleChange}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">/ Hour</InputAdornment>
                  ),
                }}
              />
            </Card>
            <Button fullWidth type="submit">
              Save
            </Button>
          </form>
        </LeftSide>

        <RightSide>
          <ServicePreview
            title={formik.values.title || "Service name"}
            description={formik.values.description}
          />
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

const PRICE_DURATION_HOURS = [
  {
    value: "1",
    label: "1 Hour",
  },
  {
    value: "2",
    label: "2 Hours",
  },
  {
    value: "3",
    label: "3 Hours",
  },
  {
    value: "4",
    label: "4 Hours",
  },
  {
    value: "5",
    label: "5 Hours",
  },
  {
    value: "6",
    label: "6 Hours",
  },
  {
    value: "7",
    label: "7 Hours",
  },
  {
    value: "8",
    label: "8 Hours",
  },
];

const PRICE_DURATION_MINUTES = [
  {
    value: "0",
    label: "0 Minutes",
  },
  {
    value: "15",
    label: "15 Minutes",
  },
  {
    value: "30",
    label: "30 Minutes",
  },
  {
    value: "45",
    label: "45 Minutes",
  },
];
