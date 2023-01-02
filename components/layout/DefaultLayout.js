// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// COMPONENTS
import BusinessSidebar from "./BusinessSidebar";
import ClientSidebar from "components/layout/ClientSidebar";

const DefaultLayout = ({ children, userType, title, secondaryText, cta }) => {
  const ctaProps = { startIcon: <AddIcon /> };
  if (cta) {
    if (cta.fn) ctaProps.onClick = cta.fn;
    if (cta.href) ctaProps.href = cta.href;
    if (cta.withNoIcon) ctaProps.startIcon = null;
  }

  return (
    <Container>
      {userType === "client" ? <ClientSidebar /> : <BusinessSidebar />}
      <Content>
        <ContentTop>
          <div>
            <Typography variant="h4">{title}</Typography>
            <Typography>{secondaryText}</Typography>
          </div>
          {cta && <Button {...ctaProps}>{cta.text}</Button>}
        </ContentTop>
        <ChildrenContainer>{children}</ChildrenContainer>
      </Content>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flex: 1,
  height: "100vh",
});

const Content = styled("div")({
  padding: 32,
  background: "#EFF1F5",
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

const ContentTop = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 40,
});

const ChildrenContainer = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  overflowX: "hidden",
});

export default DefaultLayout;
