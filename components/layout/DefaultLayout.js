// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Button, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// COMPONENTS
import BusinessSidebar from "./BusinessSidebar";
import ClientSidebar from "components/layout/ClientSidebar";

const DefaultLayout = ({
  children,
  userType,
  title,
  secondaryText,
  cta,
  diffBanner,
}) => {
  const ctaProps = { startIcon: <AddIcon /> };
  if (cta) {
    if (cta.fn) ctaProps.onClick = cta.fn;
    if (cta.href) ctaProps.href = cta.href;
    if (cta.withNoIcon) ctaProps.startIcon = null;
  }
  
  return (
    <Container>
      {userType === "client" ? <ClientSidebar /> : <BusinessSidebar />}
      <RightContent>
        {Boolean(diffBanner) && diffBanner.isVisible ? (
          <DiffBanner diffBanner={diffBanner} />
        ) : (
          <NavigationBar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </NavigationBar>
        )}
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
      </RightContent>
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

const RightContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const NavigationBar = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: 74,
  background: "#FFFFFF",
  padding: "0 32px",
});

const DiffBanner = ({ diffBanner }) => {
  if (!diffBanner) return null;
  return (
    <DiffBannerContainer>
      <Typography>Unsaved changes</Typography>
      <div>
        <Button
          variant="outlined"
          onClick={diffBanner.onDiscard}
          sx={{ mr: 2 }}
        >
          Discard
        </Button>
        <Button onClick={diffBanner.onSave}>Save</Button>
      </div>
    </DiffBannerContainer>
  );
};

const DiffBannerContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 74,
  background: "rgba(114, 155, 255, 0.16)",
  padding: "0 32px",
});

export default DefaultLayout;
