import { useEffect } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";

// MATERIAL UI
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

// COMPONENTS
import Card from "components/Card";
import useService from "utils/useService";
import { UPDATE_SERVICE_CHECKOUT } from "graphql/apiql";

const CheckoutForm = ({ updateCta, serviceId }) => {
  const { service } = useService(serviceId);

  const [updateServiceCheckoutFn, updateServiceCheckoutHpr] = useMutation(
    UPDATE_SERVICE_CHECKOUT
  );

  useEffect(() => {
    updateCta({
      fn: () => {
        formik.submitForm();
      },
    });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      checkoutTitle: service ? service.checkoutTitle : "",
      checkoutMessage: service ? service.checkoutMessage : "",
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      updateServiceCheckoutFn({
        variables: {
          input: values,
          serviceId,
        },
      });
    },
  });

  return (
    <div>
      <Card title="Order Details"></Card>

      <Card title="Order Confirmation Page">
        <TextField
          label="Custom Headline"
          name="checkoutTitle"
          value={formik.values.checkoutTitle}
          onChange={formik.handleChange}
        />
        <TextField
          label="Custom Message"
          name="checkoutMessage"
          value={formik.values.checkoutMessage}
          onChange={formik.handleChange}
          rows={5}
          maxRows={5}
          multiline
        />
      </Card>

      <Card title="Checkout Options">
        <FormControlLabel control={<Checkbox />} label="Allow Gest Checkout" />
      </Card>

      <Card title="Service Request Link">
        <Typography variant="small" sx={{ mb: 2, mt: 2 }}>
          You can copy and paste this link to share this service's bookingfrom
          with your customers
        </Typography>
        <TextField
          label="Custom Headline"
          value={"http://localhost:3000/services/new-service"}
          // onChange={formik.handleChange}
        />
      </Card>
    </div>
  );
};

export default CheckoutForm;
