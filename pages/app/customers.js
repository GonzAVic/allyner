
// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";

const customers = () => {
  return (
    <DefaultLayout
        title="Customers"
        secondaryText="Helper text goes here."
        cta={{
          text: "Add Customer",
          href: "/customers",
        }}
      ></DefaultLayout>
  )
}

export default customers