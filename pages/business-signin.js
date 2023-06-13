import { useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import * as yup from "yup";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField, Button, Alert } from "@mui/material";

// OTHER
import Asset1 from "assets/asset-1.svg";
import Asset2 from "assets/asset-2.svg";
import Asset3 from "assets/asset-3.svg";
import Asset4 from "assets/asset-4.svg";
import AllynerLogo from "assets/allyner-logo.svg";

const BusinessSignin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated")
      router.push(`${window.location.origin}/app`);
  }, [status]);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: createSigninSchema(),
    onSubmit: async (values) => {
      const userData = {
        email: values.email,
        password: values.password,
      };

      const res = await signIn("credentials", {
        redirect: false,
        email: JSON.stringify({ userData }),
        password: "---",
        callbackUrl: `${window.location.origin}/app`,
      });
    },
  });

  return (
    <Container onSubmit={formik.handleSubmit}>
      <Asset sx={{ top: -130, left: -40 }} src={Asset1.src} />
      <Asset sx={{ top: -80, right: -40 }} src={Asset2.src} />
      <Asset sx={{ bottom: -130, left: -40 }} src={Asset3.src} />
      <Asset sx={{ bottom: -130, right: -40 }} src={Asset4.src} />

      <img className="logo" src={AllynerLogo.src} />
      <Typography variant="h4" sx={{ mt: 4, textAlign: "center" }}>
        Hi. Wlecome ✋
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 5, textAlign: "center" }}
      >
        Share your services in an easy way around the world
      </Typography>
      <Alert severity="error" sx={{ mb: 3.5 }}>
        This is an error alert — check it out!
      </Alert>
      <TextField
        label="Email"
        name="email"
        onChange={formik.handleChange}
        helperText={formik.errors.email}
        error={formik.errors.email}
        sx={{ mb: 2.5 }}
      />
      <TextField
        label="Password"
        name="password"
        onChange={formik.handleChange}
        helperText={formik.errors.password}
        error={formik.errors.password}
      />
      <Button type="submit" fullWidth>
        Sign In
      </Button>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 5, textAlign: "center" }}
      >
        Already have an account?
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

export default BusinessSignin;

const createSigninSchema = () => {
  let schemaAttributes = {
    email: yup.string().required(),
    password: yup.string().required(),
  };
  return yup.object().shape(schemaAttributes);
};
