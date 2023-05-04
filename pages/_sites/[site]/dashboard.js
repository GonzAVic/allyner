import { useEffect, useState, useContext } from "react";

// MATERIAL UI
import { Typography } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServiceCard from "components/service/ServiceCard";
import OrderCard from "components/OrderCard";

// OTHER
import useServiceReq from "utils/useServiceReq";
import { AppContext } from "contexts/AppContext";
import { ClientContext } from "contexts/ClientContext";

const Index = () => {
  const { sessionRepo } = useContext(AppContext);
  const { businessRepo } = useContext(ClientContext);
  const { services } = businessRepo;
  const { user } = sessionRepo;

  const [serviceReqs, setServiceReqs] = useState([]);

  const { findClientServiceReqs } = useServiceReq();

  useEffect(() => {
    const onMount = async () => {
      const response = await findClientServiceReqs(2, user?.id);
      const srs = response.filter(
        (sr) => sr.status !== "Not Started" || sr.status !== "Completed"
      );
      setServiceReqs(srs);
    };
    onMount();
  }, []);

  return (
    <DefaultLayout
      title="Good Afternoon Kaenate"
      secondaryText="Welcome to Allyner technologies inc."
      userType="client"
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Active Orders
      </Typography>
      {serviceReqs.map((sr, index) => (
        <OrderCard key={index} serviceReq={sr} />
      ))}

      <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
        Check our services
      </Typography>
      <div className="service-cards-list-ctr">
        {services.map((s, index) => (
          <ServiceCard key={index} service={s} userType="client" />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Index;
