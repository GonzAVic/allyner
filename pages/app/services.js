import { useContext } from "react";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import BusinessHOC from "components/BusinessHOC";
import ServiceCard from "components/service/ServiceCard";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";

const Services = () => {
  const { businessRepo } = useContext(BusinessContext);
  return (
    <BusinessHOC>
      <DefaultLayout
        title="Services"
        cta={{
          text: "Add New Services",
          href: "/app/services/details/?id=new",
          variant: "contained",
        }}
      >
        <div className="service-cards-list-ctr">
          {businessRepo.services.map((service) => {
            return <ServiceCard key={service.id} service={service} />;
          })}
        </div>
      </DefaultLayout>
    </BusinessHOC>
  );
};
export default Services;
