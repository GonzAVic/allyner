// MATERIAL UI
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

// COMPONENTS
import Card from "components/Card";

const CheckoutForm = () => {
  return (
    <div>
      <Card title="Order Details"></Card>

      <Card title="Order Confirmation Page">
        <TextField
          label="Custom Headline"
          value={"formik.values.title"}
          // onChange={formik.handleChange}
        />
        <TextField
          label="Custom Message"
          // value={formik.values.title}
          // onChange={formik.handleChange}
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
