import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import QuestionResponse from "components/QuestionResponse";

// OTHER
import useServiceReq from "utils/useServiceReq";

const OderOverview = ({ userType }) => {
  const router = useRouter();
  const { serviceReq } = useServiceReq(router.query.orderId);

  if (!serviceReq) return "Loading serviceReq";
  return (
    <DefaultLayout title="Order Details" userType={userType}>
      <Content>
        <div>
          {userType !== "client" && (
            <>
              <Typography className="section-title" variant="subtitle1">
                Customer details
              </Typography>
              <Box className="card" sx={{ mb: 3 }}>
                <OrderItem label="Customer Name" value="Alwi Hesa" />
                <OrderItem label="Customer Email" value="alwi@gmail.com" />
                <OrderItem label="Client Account" value="Yes" />
              </Box>
            </>
          )}

          <Typography className="section-title" variant="subtitle1">
            Order details
          </Typography>
          <Box className="card">
            <OrderItem label="Order ID" value={`#${serviceReq.id}`} />
            <OrderItem label="Price" value="$57" />
            <OrderItem
              label="Service description"
              value={serviceReq.frozenService.description}
            />
            <OrderItem
              label="Order Date"
              value={serviceReq.frozenService.createdAt}
            />
            <OrderItem label="Last update date" value="16/01/2023" />
          </Box>
        </div>

        <div>
          <Typography className="section-title" variant="subtitle1">
            In-take question
          </Typography>
          <Box className="card">
            {serviceReq.additionalInfo.map((q, index) => {
              return (
                <QuestionResponse
                  key={index}
                  number={index + 1}
                  sentence={q.title}
                  answer={q.answer}
                />
              );
            })}
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

export default OderOverview;
