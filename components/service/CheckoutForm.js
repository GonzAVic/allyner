// MATERIAL UI
import {
  TextField,
  Button,
  MenuItem,
  Box,
  InputAdornment,
} from "@mui/material";

// COMPONENTS
import Card from "components/Card";

const CheckoutForm = () => {
  return (
    <div>
      <Card title="Order Details">
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
    </div>
  );
};

export default CheckoutForm;
