import { useContext } from "react";

// MATERIAL UI
import { TextField, Box, Typography, Button } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import PreviewLayout from "components/layout/PreviewLayout";
import BusinessHome from "components/BusinessHome";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";
import { copyToClipBoard } from "utils/utils";

const Page = () => {
  const { businessRepo } = useContext(BusinessContext);
  const { business } = businessRepo;

  return (
    <DefaultLayout title="Online Store">
      <PreviewLayout
        previewComponent={<BusinessHome business={business} isResponsive />}
        noTopSpace
      >
        <Typography className="section-title" variant="subtitle1">
          Store Details
        </Typography>
        <Box className="card" sx={{ mb: 5 }}>
          <Typography variant="subtitle1">Booking Page URL</Typography>
          <TextField
            value={"https://" + business.subdomain + ".allyner.com"}
            disabled
          />
          <Button
            variant="text"
            onClick={() =>
              copyToClipBoard("https://" + business.subdomain + ".allyner.com")
            }
            startIcon={<LinkIcon />}
          >
            Copy Link
          </Button>
        </Box>
      </PreviewLayout>
    </DefaultLayout>
  );
};

export default Page;
