import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";

// COMPONENTS
import SidebarItem from "./SidebarItem";

const ClientSidebar = ({ isResponsive, isMenuOpen }) => {
  const router = useRouter();

  return (
    <Container isResponsive={isResponsive} isMenuOpen={isMenuOpen}>
      <SidebarItem
        label="Home"
        icon={<HomeOutlinedIcon />}
        href="/"
        isActive={router.asPath === "/"}
      />
      <SidebarItem
        label="Orders"
        icon={<SignalCellularAltRoundedIcon />}
        href="/orders"
        isActive={router.asPath === "/orders"}
      />
    </Container>
  );
};

const Container = styled("div")(({ isResponsive, isMenuOpen }) => ({
  display: isMenuOpen && isResponsive ? "flex" : "none",
  position: isMenuOpen && isResponsive ? "absolute" : "relative",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: 300,
  padding: 32,
  height: "100vh",
  background: "#FFFFFF",
  zIndex: 3,
}));

export default ClientSidebar;
