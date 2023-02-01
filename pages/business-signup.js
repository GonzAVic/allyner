import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// MATERIAL UI
import { styled } from "@mui/system";
import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// OTHER
import Asset1 from "assets/asset-1.svg";
import Asset2 from "assets/asset-2.svg";
import Asset3 from "assets/asset-3.svg";
import Asset4 from "assets/asset-4.svg";
import AllynerLogo from "assets/allyner-logo.svg";

const BusinessSignup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      email: "",
      password: "",
      name: "",
      companyName: "",
      industry: "",
    },
    validationSchema: createSignupSchema(),
    onSubmit: (values) => {
      console.log("-> values: ", values);
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
        label="Name"
        name="name"
        onChange={formik.handleChange}
        helperText={formik.errors.name}
        error={formik.errors.name}
      />
      <TextField
        label="Company Name"
        name="name"
        onChange={formik.handleChange}
        helperText={formik.errors.name}
        error={formik.errors.name}
      />
      <TextField
        label="Industry"
        name="industry"
        onChange={formik.handleChange}
        helperText={formik.errors.industry}
        error={formik.errors.industry}
      />

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

      <Button type="submit" fullWidth sx={{ mt: 4 }}>
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
    name: yup.string().required(),
    companyName: yup.string().required(),
    industry: yup.string().required(),
  };
  return yup.object().shape(schemaAttributes);
};
