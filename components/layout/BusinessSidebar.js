import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Divider, Typography, Box } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// COMPONENTS
import SidebarItem from "./SidebarItem";

// OTHER
import useBusiness from "utils/useBusiness";

const BusinessSidebar = ({ isResponsive, isMenuOpen }) => {
  const router = useRouter();
  const { business } = useBusiness();

  if (!business) return null;
  return (
    <Container isResponsive={isResponsive} isMenuOpen={isMenuOpen}>
      <Box className="space-centered" sx={{ mb: 8 }}>
        <img className="businessLogo" src={business.logo} />
        <Typography variant="h5">{business.name}</Typography>
      </Box>
      <SidebarItem
        label="Home"
        href="/app/"
        isActive={router.asPath === "/app"}
        icon={<HomeOutlinedIcon />}
      />
      <SidebarItem
        label="Orders"
        href="/app/orders"
        isActive={router.asPath.includes("/orders")}
        icon={<SignalCellularAltRoundedIcon />}
      />
      <SidebarItem
        label="Services"
        href="/app/services"
        isActive={
          router.asPath === "/app/services" ||
          router.pathname === "/app/services/in-take-questions" ||
          router.pathname === "/app/services/details"
        }
        icon={<LayersOutlinedIcon />}
      />
      <SidebarItem
        label="Service Booking"
        href="/app/services/order-status"
        isActive={
          router.asPath.includes("services/") &&
          !router.asPath.includes("details") &&
          !router.asPath.includes("in-take-questions")
        }
        icon={<FiberManualRecordIcon fontSize="small" />}
      />
      <SidebarItem
        label="Customers"
        href="/app/customers"
        isActive={router.asPath.includes("/customers")}
        icon={<PeopleOutlineOutlinedIcon />}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <SidebarItem
        label="Stores"
        href="/app/store"
        isActive={router.asPath === "/app/store"}
        icon={<StorefrontIcon />}
      />
      <SidebarItem
        label="Authentication"
        href="/app/store/authentication-signup"
        isActive={router.asPath.includes("store/authentication")}
        icon={<FiberManualRecordIcon fontSize="small" />}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <SidebarItem
        label="Settings"
        href="/app/settings"
        isActive={router.asPath.includes("/settings")}
        icon={<SettingsIcon />}
      />

      <SidebarItem label="Log Out" icon={<LogoutOutlinedIcon />} />
    </Container>
  );
};

const Container = styled("div")(({ isResponsive, isMenuOpen }) => ({
  display: isResponsive
    ? isMenuOpen && isResponsive
      ? "flex"
      : "none"
    : "flex",
  position: isMenuOpen && isResponsive ? "absolute" : "relative",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: 300,
  padding: 32,
  height: "100vh",
  background: "#FFFFFF",
  zIndex: 3,

  ".businessLogo": {
    width: 32,
    marginRight: 8,
  },
}));

export default BusinessSidebar;
