import { useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { CREATE_SERVICE, UPDATE_SERVICE } from "graphql/apiql";

// MATERIAL UI
import { TextField, MenuItem, Box, Typography } from "@mui/material";

// COMPONENTS
import Tiptap from "components/TipTap";
import Uploader from "components/Uploader";
import useService from "utils/useService";

const ServiceDetailsForm = ({
  updatePreviewData,
  updateDiffBanner,
  serviceId,
}) => {
  const router = useRouter();
  const { service, updateService, createService } = useService(router.query.id);

  const [createServiceFn, createServiceHpr] = useMutation(CREATE_SERVICE);

  const isNewService = router.query.id === "new";

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: service?.name,
      description: service?.description,
      cover: service?.cover,
      callToAction:
        service && service.callToAction ? service.callToAction : "Book Now",
      // TODO: Change pricintType to String
      pricingType: service && service.pricingType ? service.pricingType : 1,
      durationHours:
        service && service.pricingDuration ? service.pricingDuration % 60 : 1,
      durationMinutes:
        service && service.pricingDuration
          ? ((service.pricingDuration / 60) % 1) * 60
          : 15,
      pricingAmount:
        service && service.pricingAmount ? service.pricingAmount : 50,
      status: service && service.status ? service.status : "DRAFT",
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      const pricingDuration =
        values.durationHours * 60 + values.durationMinutes;
      const attributes = {
        name: values.name,
        description: values.description,
        businessId: 1,
        pricingDuration,
        pricingAmount: values.pricingAmount,
        pricingType: values.pricingType,
        callToAction: values.callToAction,
        cover: values.cover,
        status: values.status,
      };

      if (isNewService) {
        createService(attributes);
      } else {
        updateService(attributes);
      }
    },
  });

  useEffect(() => {
    updatePreviewData(formik.values);
    const initialValuesString = JSON.stringify(formik.initialValues);
    const currentValuesString = JSON.stringify(formik.values);
    const areCurrentAndInitialValuesEqual =
      initialValuesString === currentValuesString;
    updateDiffBanner({
      onSave: () => formik.submitForm(),
      onDiscard: () => {
        formik.handleReset();
      },
      isVisible: !areCurrentAndInitialValuesEqual,
    });
  }, [formik.values]);

  const handleDescriptionChange = (value) => {
    formik.setFieldValue("description", value);
  };

  const handleCoverChange = (fileUrl) => {
    formik.setFieldValue("cover", fileUrl);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography className="section-title" variant="subtitle1">
        General Details
      </Typography>
      <Box className="card" sx={{ mb: 5 }}>
        <Typography variant="subtitle1">Service name</Typography>
        <TextField
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <Typography variant="subtitle1">Description</Typography>
        <Tiptap
          onUpdate={handleDescriptionChange}
          initialValue={service ? service.description : null}
        />

        <Typography variant="subtitle1">Thumbnail</Typography>
        <Uploader onFileUploaded={handleCoverChange} />

        <Typography variant="subtitle1">CTA</Typography>
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
      </Box>

      <Typography className="section-title" variant="h6">
        Status
      </Typography>
      <Box className="card" sx={{ mb: 5 }}>
        <TextField
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          select
        >
          {STATUS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Typography className="section-title" variant="h6">
        Pricing
      </Typography>
      <Box className="card" sx={{ mb: 5 }}>
        <TextField
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
        {formik.values.pricingType === "BY_TIME" && (
          <Box className="row-2" sx={{ alignItems: "flex-end", mt: 2 }}>
            <TextField
              name="durationHours"
              value={formik.values.durationHours}
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
              name="durationMinutes"
              value={formik.values.durationMinutes}
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
        {formik.values.pricingType !== "FREE" && (
          <TextField
            name="pricingAmount"
            value={formik.values.pricingAmount}
            onChange={formik.handleChange}
            type="number"
            sx={{ mt: 2 }}
          />
        )}
      </Box>

      <Typography className="section-title" variant="h6">
        Service URL
      </Typography>
      <Box className="card">
        <TextField
          name="serviceUrl"
          value="https://allyner.com/service/dsfjsaaw8213-23182/services1"
        />
      </Box>
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
  {
    value: 9,
    label: "9 Hours",
  },
  {
    value: 10,
    label: "10 Hours",
  },
  {
    value: 11,
    label: "11 Hours",
  },
  {
    value: 12,
    label: "12 Hours",
  },
  {
    value: 13,
    label: "13 Hours",
  },
  {
    value: 14,
    label: "14 Hours",
  },
  {
    value: 15,
    label: "15 Hours",
  },
  {
    value: 16,
    label: "16 Hours",
  },
  {
    value: 17,
    label: "17 Hours",
  },
  {
    value: 18,
    label: "18 Hours",
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

const STATUS = [
  {
    value: "DRAFT",
    label: "Active",
  },
  {
    value: "IN_PROGRESS",
    label: "Inactive",
  },
];

const CTA_OPTIONS = ["Book Now", "Get A Quote"];

export default ServiceDetailsForm;
