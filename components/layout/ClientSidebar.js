import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";

// COMPONENTS
import SidebarItem from "./SidebarItem";

const ClientSidebar = () => {
  const router = useRouter();

  return (
    <Container>
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

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: 275,
  padding: 32,
  height: "100vh",
});

export default ClientSidebar;
