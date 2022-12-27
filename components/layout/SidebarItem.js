import Link from "next/link";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button } from "@mui/material";

const SidebarItem = ({ label, href = "/services", isActive, icon }) => {
  return (
    <Link href={href}>
      <Container variant="text" startIcon={icon} isActive={isActive}>
        {label}
      </Container>
    </Link>
  );
};

const Container = styled(Button)(({ isActive }) => ({
  display: "flex",
  justifyContent: "flex-start",
  fontWeight: 400,
  fontSize: 16,
  color: "#73839D",
  marginTop: 4,
  marginBottom: 4,
}));

export default SidebarItem;
