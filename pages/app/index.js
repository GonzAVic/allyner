import React, { useContext } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Chip, Box } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServiceCard from "components/service/ServiceCard";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";

export default function Index() {
  const { businessRepo, userRepo } = useContext(BusinessContext);

  const currentTime = new Date().getHours();
  let greetingText = "";

  if (currentTime < 12) {
    greetingText = "Good Morning";
  } else if (currentTime < 18) {
    greetingText = "Good Afternoon";
  } else {
    greetingText = "Good Evening";
  }

  return (
    <DefaultLayout title={`${greetingText} ${userRepo.user.firstname}`}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Your Services
      </Typography>
      <div className="service-cards-list-ctr">
        {businessRepo.services.map((service) => {
          return <ServiceCard key={service.id} service={service} />;
        })}
      </div>
    </DefaultLayout>
  );
}

const HomeCard = ({ icon, value, label, percentage }) => {
  return (
    <Container className="card">
      {icon}
      <Row sx={{ mt: 3, mb: 0.5 }}>
        <Typography variant="h3">{value}</Typography>
        <Chip label={percentage} />
      </Row>
      <Row>
        <Typography color="text.secondary">Total Session</Typography>
        <Typography color="text.secondary">From last week</Typography>
      </Row>
    </Container>
  );
};

const Container = styled("div")({
  width: 354,

  svg: {
    fill: "#73839D",
  },
});

const Row = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
});
