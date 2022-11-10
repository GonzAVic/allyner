import { useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { CREATE_SERVICE, UPDATE_SERVICE_DETAILS } from "graphql/apiql";

// MATERIAL UI
import { TextField, MenuItem, Box, InputAdornment } from "@mui/material";

// COMPONENTS
import Card from "components/Card";
import Tiptap from "components/TipTap";
import Uploader from "components/Uploader";
import useService from "utils/useService";

const ServiceDetailsForm = ({ updatePreviewData, updateCta, serviceId }) => {
  const router = useRouter();
  const { service } = useService(router.query.id);

  const [createServiceFn, createServiceHpr] = useMutation(CREATE_SERVICE);
  const [updateServiceDetailsFn, updateServiceDetailsHpr] = useMutation(
    UPDATE_SERVICE_DETAILS
  );

  const isNewService = router.query.id === "new";

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: service ? service.title : "",
      description: service ? service.description : "",
      cover: service ? service.cover : "",
      callToAction: service ? service.callToAction : "",

      pricing: {
        type: service ? service.pricing.type : "FIXED",
        durationHours: service ? service.pricing.durationHours : 1,
        durationMinutes: service ? service.pricing.durationMinutes : 0,
        amount: service ? service.pricing.amount : 50,
      },
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      if (isNewService)
        createServiceFn({
          variables: {
            input: values,
          },
        });
      else {
        updateServiceDetailsFn({ variables: { input: values, serviceId } });
      }
    },
  });

  useEffect(() => {
    updatePreviewData(formik.values);
    updateCta({
      fn: () => {
        formik.submitForm();
      },
    });
  }, [formik.values]);

  useEffect(() => {
    if (!createServiceHpr.called) return;
    if (!createServiceHpr.data) return;
    const newService = createServiceHpr.data.createService;

    router.push({
      pathname: `/services/overview`,
      query: { id: newService.id },
    });
  }, [createServiceHpr.data]);

  const handleDescriptionChange = (value) => {
    formik.setFieldValue("description", value);
  };

  const handleCoverChange = (imageUrls) => {
    formik.setFieldValue("cover", imageUrls[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card title="Title">
        <TextField
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
      </Card>

      <Card title="Description">
        <Tiptap
          onUpdate={handleDescriptionChange}
          initialValue={service ? service.description : null}
        />
      </Card>

      <Card title="Avatar">
        <Uploader onFilesUploaded={handleCoverChange} />
      </Card>

      <Card title="CTA">
        <TextField
          name="callToAction"
          value={formik.values.callToAction || "Book Now"}
          onChange={formik.handleChange}
          select
        >
          {CTA_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Card>

      <Card title="Pricing">
        <TextField
          label="Pricing Type"
          name="pricing.type"
          value={formik.values.pricing.type}
          onChange={formik.handleChange}
          select
        >
          {PRICING_TYPES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {formik.values.pricing.type === "BY_TIME" && (
          <Box className="row-2" sx={{ alignItems: "flex-end" }}>
            <TextField
              label="Duration"
              name="pricing.durationHours"
              value={formik.values.pricing.durationHours}
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
              name="pricing.durationMinutes"
              value={formik.values.pricing.durationMinutes}
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
        )}
        {formik.values.pricing.type !== "FREE" && (
          <TextField
            label="Price"
            name="pricing.amount"
            value={formik.values.pricing.amount}
            onChange={formik.handleChange}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              endAdornment:
                formik.values.pricing.type === "BY_TIME" ? (
                  <InputAdornment position="end">/ Hour</InputAdornment>
                ) : null,
            }}
          />
        )}
      </Card>
    </form>
  );
};

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
    value: 1,
    label: "1 Hour",
  },
  {
    value: 2,
    label: "2 Hours",
  },
  {
    value: 3,
    label: "3 Hours",
  },
  {
    value: 4,
    label: "4 Hours",
  },
  {
    value: 5,
    label: "5 Hours",
  },
  {
    value: 6,
    label: "6 Hours",
  },
  {
    value: 7,
    label: "7 Hours",
  },
  {
    value: 8,
    label: "8 Hours",
  },
];

const PRICE_DURATION_MINUTES = [
  {
    value: 0,
    label: "0 Minutes",
  },
  {
    value: 15,
    label: "15 Minutes",
  },
  {
    value: 30,
    label: "30 Minutes",
  },
  {
    value: 45,
    label: "45 Minutes",
  },
];

const CTA_OPTIONS = ["Book Now", "Get A Quote"];

export default ServiceDetailsForm;
