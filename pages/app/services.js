// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import BusinessHOC from "components/BusinessHOC";
import ServiceCard from "components/service/ServiceCard";

const Services = () => {
  return (
    <BusinessHOC>
      <DefaultLayout
        title="Services"
        cta={{
          text: "Add Service",
          href: "/app/services/overview/?id=new",
        }}
      >
        <div className="service-cards-list-ctr">
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </DefaultLayout>
    </BusinessHOC>
  );
};
export default Services;
