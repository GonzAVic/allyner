import { useContext } from "react";

// MATERIAL UI
import { TextField, Box, Typography, Button } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LinkIcon from "@mui/icons-material/Link";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import PreviewLayout from "components/layout/PreviewLayout";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";
import { copyToClipBoard } from "utils/utils";

const Page = () => {
  const { businessRepo } = useContext(BusinessContext);
  const { businessSubdomain } = businessRepo;

  return (
    <DefaultLayout title="Online Store">
      <PreviewLayout previewComponent={"LALALALA"}>
        <Typography className="section-title" variant="subtitle1">
          Store Details
        </Typography>
        <Box className="card" sx={{ mb: 5 }}>
          <Typography variant="subtitle1">Booking Page URL</Typography>
          <TextField value={"https://" + businessSubdomain + ".allyner.com"} />
          <Button
            variant="text"
            onClick={() =>
              copyToClipBoard("https://" + businessSubdomain + ".allyner.com")
            }
            startIcon={<LinkIcon />}
          >
            Copy Link
          </Button>
          <Button variant="text" startIcon={<ShareOutlinedIcon />}>
            Share
          </Button>
        </Box>
      </PreviewLayout>
    </DefaultLayout>
  );
};

export default Page;
