import { useContext } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";

// MATERIAL UI
import { TextField, MenuItem, Box, Typography, Button } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

// COMPONENTS
import Uploader from "components/Uploader";
import FileCard from "components/FileCard";
import ServiceCard from "components/service/ServiceCard";
import PreviewLayout from "components/layout/PreviewLayout";
import DefaultLayout from "components/layout/DefaultLayout";
import ServiceDetailsTabs from "components/ServiceDetailsTabs";

// OTHERS
import { BusinessContext } from "contexts/BusinessContext";
import { AppContext } from "contexts/AppContext";
import { pricingTypes } from "utils/constants";
import { copyToClipBoard } from "utils/utils";

const Page = () => {
  const router = useRouter();
  const { serviceRepo, businessRepo } = useContext(BusinessContext);
  const { modalRepo } = useContext(AppContext);
  const { service, updateService, createService } = serviceRepo;
  const { business } = businessRepo;

  const duration = service?.pricingDuration / 60;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: service?.name || "",
      description: service?.description || "",
      cover: service?.cover || "",
      callToAction: service?.callToAction || "Book Now",
      pricingType: service?.pricingType || "FIXED",
      durationHours: duration ? parseInt(duration) : 1,
      durationMinutes:
        service && service.pricingDuration
          ? ((service.pricingDuration / 60) % 1) * 60
          : 15,
      pricingAmount:
        service && service.pricingAmount ? service.pricingAmount : 50,
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      const pricingDuration =
        values.durationHours * 60 + values.durationMinutes;
      const attributes = {
        name: values.name,
        description: values.description,
        pricingDuration,
        pricingAmount: values.pricingAmount,
        pricingType: String(values.pricingType),
        callToAction: values.callToAction,
        cover: values.cover,
      };

      if (!attributes.pricingType) delete attributes.pricingType;

      if (router.query.id === "new") {
        createService(attributes);
      } else {
        updateService(attributes);
      }
    },
  });

  const handleCoverChange = (fileUrl) => {
    formik.setFieldValue("cover", fileUrl);
  };

  const serviceUrl =
    "https://" + business.subdomain + ".allyner.com/services/" + service?.id;

  return (
    <DefaultLayout
      title={formik.values.name || "Service Name"}
      backHref="/app/services"
      formik={formik}
      chipData={
        service && {
          text: service.isActive ? "Active" : "Inactive",
          color: service.isActive ? "success" : "error",
        }
      }
      cta={{
        text: "Update Status",
        fn: () =>
          modalRepo.open("UpdateServiceStatus", {
            initialStatus: service.isActive,
          }),
      }}
      moreOptions={[{ text: "Delete" }]}
    >
      <ServiceDetailsTabs
        currentStep="details"
        serviceId={router.query.id}
        isNewService={router.query.id === "new"}
      />

      <PreviewLayout
        previewComponent={
          <ServiceCard service={formik.values} userType="client" />
        }
      >
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
            <TextField
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              multiline
              rows={4}
            />

            <Typography variant="subtitle1">Thumbnail</Typography>
            {formik.values.cover ? (
              <FileCard
                fileUrl={formik.values.cover}
                onDelete={() => handleCoverChange("")}
              />
            ) : (
              <Uploader
                onUploadedFinished={handleCoverChange}
                cropShape="serviceCover"
                withCropper
              />
            )}

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
            Pricing
          </Typography>
          <Box className="card" sx={{ mb: 5 }}>
            <TextField
              name="pricingType"
              value={formik.values.pricingType}
              onChange={formik.handleChange}
              select
            >
              {pricingTypes().map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {formik.values.pricingType === "RATE" && (
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
            {formik.values.pricingType !== "CONTACT" && (
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
            <TextField name="serviceUrl" value={serviceUrl} disabled />
            <Button
              variant="text"
              startIcon={<LinkIcon />}
              onClick={() => copyToClipBoard(serviceUrl)}
            >
              Copy Link
            </Button>
          </Box>
        </form>
      </PreviewLayout>
    </DefaultLayout>
  );
};

// TODO: Move this to constants
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

const CTA_OPTIONS = ["Book Now", "Get A Quote"];

export default Page;
