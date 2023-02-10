// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import QuestionResponse from "components/QuestionResponse";

const OderDetails = () => {
  return (
    <DefaultLayout title="Order Details">
      <Content>
        <div>
          <Typography className="section-title" variant="subtitle1">
            Customer details
          </Typography>
          <Box className="card">
            <OrderItem label="Customer Name" value="Alwi Hesa" />
            <OrderItem label="Customer Email" value="alwi@gmail.com" />
            <OrderItem label="Client Account" value="Yes" />
          </Box>

          <Typography
            className="section-title"
            variant="subtitle1"
            sx={{ mt: 3 }}
          >
            Order details
          </Typography>
          <Box className="card">
            <OrderItem label="Order ID" value="#123123" />
            <OrderItem label="Price" value="$57" />
            <OrderItem
              label="Service description"
              value="Lorem ipsum dolor siamet, putra a etra maser tu sonic tkoalsdf malapa kanga patamb23 adasdfr"
            />
            <OrderItem label="Order Date" value="16/01/2023" />
            <OrderItem label="Last update date" value="16/01/2023" />
          </Box>
        </div>

        <div>
          <Typography className="section-title" variant="subtitle1">
            In-take question
          </Typography>
          <Box className="card">
            <QuestionResponse
              number={1}
              sentence="What’s the problem your product is trying to solve?"
              response="Product Management"
            />
            <QuestionResponse
              number={2}
              sentence="What’s the problem your product is trying to solve?"
              response="Product Management"
            />
            <QuestionResponse
              number={3}
              sentence="What’s the problem your product is trying to solve?"
              response="Product Management"
            />
            <QuestionResponse
              number={4}
              sentence="What’s the problem your product is trying to solve?"
              response="Product Management"
            />
          </Box>
        </div>
      </Content>
    </DefaultLayout>
  );
};

const OrderItem = ({ label, value }) => {
  return (
    <>
      <Typography color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Typography sx={{ mb: 3 }}>{value}</Typography>
    </>
  );
};

const Content = styled("div")({
  display: "grid",
  gridTemplateColumns: "40% 1fr",
  gap: 24,
});

export default OderDetails;
