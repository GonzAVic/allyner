import { useEffect } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";

// MATERIAL UI
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";

// COMPONENTS
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
    <Container>
      <Typography className="section-title" variant="h6">
        Other Details
      </Typography>
      <Box className="card">
        <TextField placeholder="Enter status that will visible to your customer" />
        <Chip label="Draft" />
        <Chip label="In Progress" sx={{ ml: 1.5, mr: 1.5 }} />
        <Chip label="Complete" />
        <Typography
          className="section-title"
          variant="subtitle1"
          sx={{ mt: 5 }}
        >
          Other Questions
        </Typography>
        <Button variant="dashed" fullWidth>
          Add new question
        </Button>
      </Box>

      <Typography className="section-title" variant="h6">
        Other Details
      </Typography>
      <Box className="card">
        <Typography variant="subtitle1">Custom Headline</Typography>
        <TextField
          name="checkoutTitle"
          value={formik.values.checkoutTitle}
          onChange={formik.handleChange}
        />
        <Typography variant="subtitle1">Custom Message</Typography>
        <TextField
          name="checkoutMessage"
          value={formik.values.checkoutMessage}
          onChange={formik.handleChange}
          rows={5}
          maxRows={5}
          multiline
        />
      </Box>

      <Typography className="section-title" variant="h6">
        Checkout Options
      </Typography>
      <Box className="card">
        <FormControlLabel control={<Checkbox />} label="Allow Gest Checkout" />
      </Box>

      <Typography className="section-title" variant="h6">
        Service URL
      </Typography>
      <Box className="card">
        <TextField
          value={"http://localhost:3000/services/new-service"}
          // onChange={formik.handleChange}
        />
        <Button size="small" sx={{ mr: 1 }}>
          Copy URL
        </Button>
        <Button variant="outlined">Share</Button>
      </Box>
    </Container>
  );
};

const Container = styled("div")({
  "& .card": {
    marginBottom: 40,
  },
});

export default CheckoutForm;
