import { useState } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import {
  Typography,
  Button,
  Avatar,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// COMPONENTS
import BusinessSidebar from "./BusinessSidebar";
import ClientSidebar from "components/layout/ClientSidebar";

const DefaultLayout = ({
  children,
  userType,
  secondaryText,
  cta,
  diffBanner,
  title,
  titleChip,
  titleRightRender,
  onBack,
}) => {
  const isResponsive = useMediaQuery("(max-width:978px)");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const ctaProps = { startIcon: <AddIcon /> };
  if (cta) {
    if (cta.fn) ctaProps.onClick = cta.fn;
    if (cta.href) ctaProps.href = cta.href;
    if (cta.withNoIcon) ctaProps.startIcon = null;
  }

  return (
    <Container>
      {userType === "client" ? (
        <ClientSidebar isResponsive={isResponsive} isMenuOpen={isMenuOpen} />
      ) : (
        <BusinessSidebar isResponsive={isResponsive} isMenuOpen={isMenuOpen} />
      )}
      {isResponsive && (
        <IconButton
          sx={{ position: "absolute", top: 18, left: 16 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon />
        </IconButton>
      )}
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
            <Box sx={{ width: "100%" }}>
              <TitleContainer>
                <Box sx={{ display: "flex" }}>
                  {onBack && (
                    <IconButton onClick={onBack} sx={{ mr: 3 }}>
                      <ArrowBackIcon />
                    </IconButton>
                  )}
                  <Typography variant="h4">{title}</Typography>
                </Box>

                {titleRightRender && <div>{titleRightRender()}</div>}
              </TitleContainer>
              <Typography>{secondaryText}</Typography>
            </Box>
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
  height: "80%",
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
  background: "#FFFFFF",
  padding: "16px 32px",
});

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
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
  background: "rgba(114, 155, 255, 0.16)",
  padding: "16px 32px",
});

export default DefaultLayout;
