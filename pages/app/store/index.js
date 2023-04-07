// MATERIAL UI
import { TextField, Box, Typography, Button } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LinkIcon from "@mui/icons-material/Link";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import PreviewLayout from "components/layout/PreviewLayout";

// OTHER
import useBusiness from "utils/useBusiness";

const Page = () => {
  const { businessSubdomain } = useBusiness();

  return (
    <DefaultLayout title="Online Store">
      <PreviewLayout previewComponent={"LALALALA"}>
        <Typography className="section-title" variant="subtitle1">
          Store Details
        </Typography>
        <Box className="card" sx={{ mb: 5 }}>
          <Typography variant="subtitle1">Booking Page URL</Typography>
          <TextField value={"https://" + businessSubdomain + ".allyner.com"} />
          <Button variant="text" startIcon={<LinkIcon />}>
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
