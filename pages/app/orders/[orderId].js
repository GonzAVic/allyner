// MATERIAL UI
import { Typography, Box } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import OderCard from "components/OderCard";
import QuestionResponse from "components/QuestionResponse";

const OderDetails = () => {
  return (
    <DefaultLayout title="Order Details">
      <OderCard />
      <Typography variant="h6" sx={{ mb: 3, mt: 4 }}>
        In Take Question Answer
      </Typography>
      <Box className="card">
        <QuestionResponse
          number={1}
          sentence="What’s the problem your product is trying to solve?"
          response="Product Management"
        />
      </Box>
    </DefaultLayout>
  );
};

export default OderDetails;
