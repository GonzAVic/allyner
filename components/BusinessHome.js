// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Button } from "@mui/material";

// COMPONENTS
import ServiceCard from "components/service/ServiceCard";

const BusinessHome = ({ business, isResponsive }) => {
  if (!business) return "Loading business information";

  const signInUrl = "https://" + business.subdomain + ".allyner.com/signin";
  const signUpUrl = "https://" + business.subdomain + ".allyner.com/signup";

  return (
    <Container>
      <Header>
        <Typography variant="h5">{business?.name}</Typography>
        <div>
          <Button variant="outlined" sx={{ mr: 1 }} href={signInUrl}>
            Sign In
          </Button>
          <Button href={signUpUrl}>Sign Up</Button>
        </div>
      </Header>
      <Content>
        <ContentContent>
          <Typography variant="h2" sx={{ textAlign: "center", mb: 3 }}>
            Welcome
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 8 }}
          >
            Here is a list of our services
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Check our services
          </Typography>
          <ServiceList isResponsive={isResponsive}>
            {business.services.map((s, index) => {
              if (s.isActive) {
                return (
                  <ServiceCard key={index} service={s} userType="client" />
                );
              }
              return null;
            })}
          </ServiceList>
        </ContentContent>
      </Content>
    </Container>
  );
};

const Container = styled("div")({
  width: "100%",
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 40px",
});

const Content = styled("div")({
  background: "#EFF1F5",
  minHeight: "calc(100vh - 85px)",
  paddingTop: 100,
});

const ContentContent = styled("div")({
  maxWidth: 1160,
  margin: "auto",
  padding: "0 16px",
});

const ServiceList = styled("div")(({ theme, isResponsive }) => ({
  gap: 16,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: isResponsive ? "center" : "initial",

  [theme.breakpoints.down("lg")]: {
    justifyContent: "center",
  },
}));

export default BusinessHome;
