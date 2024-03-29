import { useState } from "react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
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
import Asset1 from "assets/asset-1.svg";
import Asset2 from "assets/asset-2.svg";
import Asset3 from "assets/asset-3.svg";
import Asset4 from "assets/asset-4.svg";
import AllynerLogo from "assets/allyner-logo.svg";
import { industries } from "utils/constants";

const BusinessSignup = () => {
  const router = useRouter();

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
      const userData = {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        password: values.password,
        userType: "BUSINESS",
      };

      const businessData = {
        name: values.companyName,
        industry: values.industry,
      };

      const res = await signIn("credentials", {
        redirect: false,
        email: JSON.stringify({ userData, businessData }),
        password: "---",
        callbackUrl: `${window.location.origin}/app`,
      });
      if (!res.error) {
        router.push(res.url);
      }
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
        required
      />
      <TextField
        label="Password"
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        onChange={formik.handleChange}
        helperText={formik.errors.password}
        error={formik.errors.password}
        required
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
        required
      />
      <TextField
        label="Last Name"
        name="lastName"
        onChange={formik.handleChange}
        helperText={formik.errors.lastName}
        error={formik.errors.lastName}
        required
      />
      <TextField
        label="Company Name"
        name="companyName"
        onChange={formik.handleChange}
        helperText={formik.errors.companyName}
        error={formik.errors.companyName}
        required
      />
      <TextField
        label="Industry"
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
  };
  return yup.object().shape(schemaAttributes);
};
