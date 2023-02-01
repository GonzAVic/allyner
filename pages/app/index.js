import React, { useState } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Chip, Box } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServiceCard from "components/service/ServiceCard";

export default function Index() {
  return (
    <DefaultLayout title="Good Evening Harman">
      <div className="service-cards-list-ctr">
        <HomeCard
          label="Total Session"
          value="1,382"
          percentage="20"
          isUp={true}
          icon={<ChatBubbleOutlineIcon fontSize="large" />}
        />
        <HomeCard
          label="Total Session"
          value="1,382"
          percentage="20"
          isUp={true}
          icon={<PeopleIcon fontSize="large" />}
        />
        <HomeCard
          label="Total Session"
          value="1,382"
          percentage="20"
          isUp={true}
          icon={<ReceiptIcon fontSize="large" />}
        />
      </div>
      <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>
        Your Services
      </Typography>
      <div className="service-cards-list-ctr">
        <ServiceCard />
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
