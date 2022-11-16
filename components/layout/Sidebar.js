import { useSession, signIn, signOut } from "next-auth/react";

// MATERIAL UI
import { styled } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import SupportIcon from "@mui/icons-material/Support";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

// COMPONENTS
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <Container>
      <div>
        <SidebarItem label="Home" icon={<HomeOutlinedIcon />} />
        <SidebarItem label="Orders" icon={<SignalCellularAltRoundedIcon />} />
        <SidebarItem
          label="Services"
          icon={<LayersOutlinedIcon />}
          href="/b-dashboard/services"
        />
        <SidebarItem label="Customers" icon={<PeopleOutlineOutlinedIcon />} />
      </div>
      <div>
        <SidebarItem label="Support" icon={<SupportIcon />} />
        <SidebarItem label="Settings" icon={<SettingsOutlinedIcon />} />
        <SidebarItem
          label="Log Out"
          icon={<LogoutOutlinedIcon />}
          onClick={signOut}
        />
      </div>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: 275,
  padding: 32,
  height: "100vh",
});

export default Sidebar;
