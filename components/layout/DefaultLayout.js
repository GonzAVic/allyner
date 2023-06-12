import React, { useState, useContext } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import {
  Typography,
  Button,
  Avatar,
  IconButton,
  Chip,
  Box,
  Menu,
  MenuItem,
  Link,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

// COMPONENTS
import BusinessSidebar from "./BusinessSidebar";
import ClientSidebar from "components/layout/ClientSidebar";

// OTHER
import { diffBanner as diffBannerFn } from "utils/utils";
import { BusinessContext } from "contexts/BusinessContext";
import { ClientContext } from "contexts/ClientContext";

const DefaultLayout = ({
  children,
  userType,
  secondaryText,
  cta,
  title,
  titleChip,
  backHref,
  moreOptions,
  formik,
}) => {
  const router = useRouter();

  const currentContext =
    userType === "client" ? ClientContext : BusinessContext;
  const { userRepo } = useContext(currentContext);
  const { user } = userRepo;

  const isResponsive = useMediaQuery("(max-width:978px)");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileEl, setProfileEl] = React.useState(null);
  const isMoreMenuOpened = Boolean(anchorEl);
  const isProfileMenuOpened = Boolean(profileEl);

  const diffBanner = diffBannerFn(formik);

  const openMoreMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMoreMenu = () => {
    setAnchorEl(null);
  };

  const openProfileMenu = (event) => {
    setProfileEl(event.currentTarget);
  };

  const ctaProps = { variant: "outlined" };
  if (cta) {
    if (cta.fn) ctaProps.onClick = cta.fn;
    if (cta.href) ctaProps.href = cta.href;
    if (cta.variant) ctaProps.variant = cta.variant;
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
          sx={{ position: "absolute", top: 18, left: 16, zIndex: 6 }}
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
            <Avatar
              onClick={openProfileMenu}
              alt={user?.firstName}
              src={user?.profilePicture || "/static/images/avatar/2.jpg"}
            />
            <Menu
              anchorEl={profileEl}
              open={isProfileMenuOpened}
              onClose={() => setProfileEl(null)}
            >
              <MenuItem
                onClick={() =>
                  router.push({
                    pathname:
                      userType === "client" ? "/profile" : "/app/profile",
                  })
                }
              >
                <Typography
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonOutlineOutlinedIcon sx={{ mr: 1 }} /> Profile
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  signOut({ redirect: true, callbackUrl: "/business-signin" })
                }
              >
                <Typography
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LogoutOutlinedIcon sx={{ mr: 1 }} /> Sign Out
                </Typography>
              </MenuItem>
            </Menu>
          </NavigationBar>
        )}

        <Content>
          <ContentTop>
            <Box>
              <Box sx={{ display: "flex" }}>
                {backHref && (
                  <IconButtonBg href={backHref} size="large" sx={{ mr: 3 }}>
                    <ArrowBackIcon />
                  </IconButtonBg>
                )}
                <Typography variant="h4">{title}</Typography>
              </Box>
              <Typography>{secondaryText}</Typography>
            </Box>

            <div>
              {cta && (
                <Button onClick={cta.fn} {...ctaProps}>
                  {cta.text}
                </Button>
              )}
              {moreOptions && (
                <>
                  <IconButtonBg
                    onClick={openMoreMenu}
                    size="large"
                    sx={{ ml: 2 }}
                  >
                    <MoreVertIcon />
                  </IconButtonBg>
                  <Menu
                    anchorEl={anchorEl}
                    open={isMoreMenuOpened}
                    onClose={closeMoreMenu}
                  >
                    {moreOptions.map((mo, index) => {
                      return (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            if (mo.fn) mo.fn();
                            closeMoreMenu();
                          }}
                        >
                          {mo.text}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </>
              )}
            </div>
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
  overflowY: "auto",
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

const IconButtonBg = styled(IconButton)({
  background: "#FFFFFF",
  borderRadius: 4,
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
