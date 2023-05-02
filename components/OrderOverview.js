import { useContext } from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import QuestionResponse from "components/QuestionResponse";

// OTHER
import useServiceReq from "utils/useServiceReq";
import useUser from "utils/useUser";
import { AppContext } from "contexts/AppContext";

const OderOverview = ({ userType }) => {
  const router = useRouter();
  const { modalRepo } = useContext(AppContext);
  const { serviceReq } = useServiceReq(router.query.orderId);
  const { user } = useUser(serviceReq?.userId);

  if (!serviceReq) return "Loading serviceReq";
  return (
    <DefaultLayout
      title="Order Details"
      userType={userType}
      cta={{
        text: "Update Status",
        fn: () => modalRepo.open("UpdateOrderStatus"),
      }}
      backHref={router.pathname.includes("/app") ? "/app/orders" : "/orders"}
      moreOptions={[
        { text: "Cancel Order", fn: () => modalRepo.open("CancelOrder") },
      ]}
    >
      <Content>
        <div>
          {userType !== "client" && (
            <>
              <Typography className="section-title" variant="subtitle1">
                Customer details
              </Typography>
              <Box className="card" sx={{ mb: 3 }}>
                <OrderItem label="Customer Name" value={user?.firstName} />
                <OrderItem
                  label="Customer Email"
                  value={user?.email || serviceReq.additionalInfo.clientEmail}
                />
                <OrderItem label="Client Account" value={user ? "Yes" : "No"} />
                {user &&
                  user.additionalInfo &&
                  Object.entries(user.additionalInfo).map((aI, index) => {
                    return (
                      <OrderItem key={index} label={aI[0]} value={aI[1]} />
                    );
                  })}
              </Box>
            </>
          )}

          <Typography className="section-title" variant="subtitle1">
            Order details
          </Typography>
          <Box className="card" sx={{ mb: 3 }}>
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

          <Typography className="section-title" variant="subtitle1">
            Checkout Details
          </Typography>
          <Box className="card">
            {serviceReq.additionalInfo.additionalQuestions &&
              serviceReq.additionalInfo.additionalQuestions.map((aq) => {
                return <OrderItem label={aq.title} value={aq.answer} />;
              })}
          </Box>
        </div>

        <div>
          <Typography className="section-title" variant="subtitle1">
            In-take question
          </Typography>
          <Box className="card">
            {serviceReq.answers.map((q, index) => {
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
