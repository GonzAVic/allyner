import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ServiceCheckout = ({ headline, message, user }) => {
  const router = useRouter();

  return (
    <Container>
      <Box sx={{ textAlign: "center", justifyContent: "center" }}>
        <CheckBackground>
          <CheckIcon />
        </CheckBackground>
        <Typography variant="h5">{headline || "Thank you!"}</Typography>
        <Typography
          color="text.secondary"
          sx={{ maxWidth: 520, margin: "auto", mt: 2 }}
        >
          {message ||
            "Thank you for choosing our service. We'll be in touch shortly to discuss the next steps."}
        </Typography>

        {!Boolean(user) && (
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 520, margin: "auto", mt: 6 }}
          >
            Would you like to track the progress of your service?
            <Typography
              variant="body2"
              color="primary"
              sx={{
                display: "inline-block",
                ml: 1,
                fontWeight: 700,
                cursor: "pointer",
              }}
              onClick={() => router.push("/signup")}
            >
              Sign up
            </Typography>
          </Typography>
        )}
        {Boolean(user) && (
          <Typography
            variant="body2"
            color="primary"
            sx={{
              display: "inline-block",
              ml: 1,
              mt: 6,
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => router.push("/dashboard")}
          >
            See my dashboard
          </Typography>
        )}
      </Box>
    </Container>
  );
};

const Container = styled("div")({});

const CheckBackground = styled("div")({
  width: 126,
  height: 126,
  background: "#EFF4FF",
  borderRadius: 100,
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 32,

  svg: {
    transform: "scale(2)",
  },
});

export default ServiceCheckout;
