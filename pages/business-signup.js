import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// MATERIAL UI
import { styled } from "@mui/system";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// OTHER
import useBusiness from "utils/useBusiness";
import useUser from "utils/useUser";
import Asset1 from "assets/asset-1.svg";
import Asset2 from "assets/asset-2.svg";
import Asset3 from "assets/asset-3.svg";
import Asset4 from "assets/asset-4.svg";
import AllynerLogo from "assets/allyner-logo.svg";
import { industries } from "utils/constants";

const BusinessSignup = () => {
  const { createBusiness } = useBusiness();
  const { createBusinessUser, getSession } = useUser();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      companyName: "",
      industry: "",
    },
    validationSchema: createSignupSchema(),
    onSubmit: async (values) => {
      const newBusiness = await createBusiness({
        name: values.companyName,
        subDomain: values.companyName,
      });
      if (
        !newBusiness.data ||
        !newBusiness.data.createBusiness ||
        !newBusiness.data.createBusiness.business
      )
        return;
      const businessUser = await createBusinessUser({
        firstName: values.firstName,
        lastName: "string",
        email: values.email,
        password: values.password,
        businessId: newBusiness.data.createBusiness.business.id,
      });

      const sessionData = await getSession({ email: values.email, password: values.password });
      console.log('-> sessionData: ', sessionData)

      localStorage.setItem("userId", businessUser.id);
      // localStorage.setItem("userId", businessUser.id);
      // TODO: Store the token
    },
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Container onSubmit={formik.handleSubmit}>
      <Asset sx={{ top: -130, left: -40 }} src={Asset1.src} />
      <Asset sx={{ top: -80, right: -40 }} src={Asset2.src} />
      <Asset sx={{ bottom: -130, left: -40 }} src={Asset3.src} />
      <Asset sx={{ bottom: -130, right: -40 }} src={Asset4.src} />

      <img className="logo" src={AllynerLogo.src} />
      <Typography variant="h4" sx={{ mt: 4, textAlign: "center" }}>
        Sign up now
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 5, textAlign: "center" }}
      >
        Start selling your services online today!
      </Typography>
      <TextField
        label="Email"
        name="email"
        onChange={formik.handleChange}
        helperText={formik.errors.email}
        error={formik.errors.email}
      />
      <TextField
        label="Password"
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        onChange={formik.handleChange}
        helperText={formik.errors.password}
        error={formik.errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={togglePasswordVisibility}>
                <VisibilityIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Firts Name"
        name="firstName"
        onChange={formik.handleChange}
        helperText={formik.errors.firstName}
        error={formik.errors.firstName}
      />
      <TextField
        label="Last Name"
        name="lastName"
        onChange={formik.handleChange}
        helperText={formik.errors.lastName}
        error={formik.errors.lastName}
      />
      <TextField
        label="Company Name"
        name="companyName"
        onChange={formik.handleChange}
        helperText={formik.errors.companyName}
        error={formik.errors.companyName}
      />
      <TextField
        name="industry"
        value={formik.values.industry}
        onChange={formik.handleChange}
        sx={{ textTransform: "capitalize" }}
        select
      >
        {industries.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography variant="body2">
              By creating an account, you agree to our Terms and Conditions
            </Typography>
          }
        />
      </FormGroup>

      <Button onClick={formik.submitForm} fullWidth sx={{ mt: 4 }}>
        Sign In
      </Button>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 5, textAlign: "center" }}
      >
        Don’t have an account?{" "}
      </Typography>
    </Container>
  );
};

const Container = styled("form")({
  width: "calc(100vw - 40px)",
  maxWidth: 360,
  margin: "auto",
  marginTop: 100,

  ".logo": {
    margin: "auto",
    display: "block",
  },
});

const Asset = styled("img")({
  position: "absolute",
});

export default BusinessSignup;

const createSignupSchema = () => {
  let schemaAttributes = {
    email: yup.string().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    companyName: yup.string().required(),
    industry: yup.string().required(),
  };
  return yup.object().shape(schemaAttributes);
};
