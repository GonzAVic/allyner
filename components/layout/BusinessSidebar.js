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

// COMPONENTS
import SidebarItem from "./SidebarItem";

const BusinessSidebar = () => {
  const router = useRouter();

  return (
    <Container>
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
        isActive={router.asPath.includes("/customers")}
        icon={<PeopleOutlineOutlinedIcon />}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      {/* <SidebarItem label="Support" icon={<SupportIcon />} />
      <SidebarItem label="Settings" icon={<SettingsOutlinedIcon />} /> */}
      <SidebarItem label="Log Out" icon={<LogoutOutlinedIcon />} />
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: 275,
  padding: 32,
  height: "100vh",
});

export default BusinessSidebar;
