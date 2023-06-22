// COMPONENTS
import BusinessHome from "components/BusinessHome";

// OTHER
import useBusiness from "utils/useBusiness";

const index = () => {
  const { business } = useBusiness(null, {
    useBusinessName: true,
  });

  return <BusinessHome business={business} />;
};

export default index;
