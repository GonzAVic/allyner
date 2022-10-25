// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";

const Services = () => {
  return (
    <DefaultLayout
      title="Services"
      secondaryText="Keep track of services and their status."
      cta={{ text: "Add Service", href: "/services/new-service" }}
    >
      Services
    </DefaultLayout>
  );
};

export default Services;
