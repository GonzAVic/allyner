// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Button } from "@mui/material";

// COMPONENTS
import ServiceCard from "components/service/ServiceCard";

// OTHER
import useBusiness from "utils/useBusiness";

const BusinessHome = ({ isResponsive }) => {
  const { services, business, businessSubdomain } = useBusiness();

  const signInUrl = "https://" + businessSubdomain + ".allyner.com/signin";
  const signUpUrl = "https://" + businessSubdomain + ".allyner.com/signup";

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
            {services.map((s, index) => {
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

const Container = styled("div")({});

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
