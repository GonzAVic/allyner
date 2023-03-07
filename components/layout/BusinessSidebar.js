import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Divider } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsIcon from '@mui/icons-material/Settings';

// COMPONENTS
import SidebarItem from "./SidebarItem";

const BusinessSidebar = ({ isResponsive, isMenuOpen }) => {
  const router = useRouter();

  return (
    <Container isResponsive={isResponsive} isMenuOpen={isMenuOpen}>
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
        isActive={router.asPath.includes("/services")}
        icon={<LayersOutlinedIcon />}
      />
      <SidebarItem
        label="Customers"
        href="/app/customers"
        isActive={router.asPath.includes("/settings")}
        icon={<PeopleOutlineOutlinedIcon />}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <SidebarItem
        label="Settings"
        href="/app/settings"
        isActive={router.asPath.includes("/customers")}
        icon={<SettingsIcon />}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <SidebarItem label="Log Out" icon={<LogoutOutlinedIcon />} />
    </Container>
  );
};

const Container = styled("div")(({ theme, isResponsive, isMenuOpen }) => ({
  display: isMenuOpen && isResponsive ? "none" : "flex",
  position: isMenuOpen && isResponsive ? "absolute" : "relative",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: 275,
  padding: 32,
  height: "100vh",
}));

export default BusinessSidebar;
