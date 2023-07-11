import { useContext } from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, Stepper, StepLabel, Step } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import QuestionResponse from "components/QuestionResponse";

// OTHER
import useOrder from "utils/useOrder";
import useUser from "utils/useUser";
import { concatStatuses } from "utils/utils";
import { AppContext } from "contexts/AppContext";
import { BusinessContext } from "contexts/BusinessContext";
import { ClientContext } from "contexts/ClientContext";

const OderOverview = ({ userType }) => {
  const router = useRouter();
  const { modalRepo } = useContext(AppContext);
  const { businessRepo: bBusinessRepo } = useContext(BusinessContext);
  const { businessRepo: cBusinessRepo } = useContext(ClientContext);
  const { serviceReq } = useOrder(router.query.orderId);
  const { user } = useUser(serviceReq?.userId);
  const businessRepo = userType === "client" ? cBusinessRepo : bBusinessRepo;
  const { business } = businessRepo;

  const steps = business?.additionalData.serviceStatuses
    ? concatStatuses(business.additionalData.serviceStatuses)
    : [];

  const priceLabel = () => {
    if (serviceReq.frozenService.pricingType === "CONTACT")
      return "Contact For Pricing";
    if (serviceReq.frozenService.pricingType === "RATE")
      return `${serviceReq.frozenService.pricingDuration}/hr`;
    if (serviceReq.frozenService.pricingType === "FIXED")
      return (
        "Contact For Pricing"(
          (serviceReq.frozenService.pricingDuration / 60) % 1
        ) * 60
      );
  };

  if (!serviceReq) return "Loading serviceReq";
  return (
    <DefaultLayout
      title="Order Details"
      userType={userType}
      cta={
        userType === "client"
          ? null
          : {
              text: "Update Status",
              fn: () =>
                modalRepo.open("UpdateOrderStatus", {
                  initialStatus: serviceReq.status,
                }),
            }
      }
      backHref={router.pathname.includes("/app") ? "/app/orders" : "/orders"}
      moreOptions={
        userType === "client"
          ? null
          : [
              {
                text: "Cancel Order",
                fn: () => modalRepo.open("CancelOrder"),
              },
            ]
      }
    >
      <Stepper
        activeStep={steps.indexOf(serviceReq.status)}
        alternativeLabel
        sx={{ mb: 3 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Content>
        <div>
          {userType !== "client" && (
            <>
              <Typography className="section-title" variant="subtitle1">
                Customer details
              </Typography>
              <Box className="card" sx={{ mb: 3 }}>
                {user && (
                  <OrderItem label="Customer Name" value={user?.firstname} />
                )}
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
            <OrderItem label="Price" value={priceLabel()} />
            <OrderItem
              label="Service description"
              value={serviceReq.frozenService.description}
            />
            <OrderItem
              label="Order Date"
              value={serviceReq.frozenService.createdAt}
            />
            <OrderItem
              label="Last update date"
              value={serviceReq.frozenService.updatedAt}
            />
          </Box>

          {Boolean(serviceReq.additionalInfo.additionalQuestions.length) && (
            <>
              <Typography className="section-title" variant="subtitle1">
                Checkout Details
              </Typography>
              <Box className="card">
                {serviceReq.additionalInfo.additionalQuestions &&
                  serviceReq.additionalInfo.additionalQuestions.map(
                    (aq, index) => {
                      return (
                        <OrderItem
                          key={index}
                          label={aq.title}
                          value={aq.answer}
                        />
                      );
                    }
                  )}
              </Box>
            </>
          )}
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
                  type={q.type}
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

const steps = ["Not Started", "In Progress", "Done"];

export default OderOverview;
