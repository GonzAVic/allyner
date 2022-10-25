// MATERIAL UI
import { styled } from "@mui/system";
import { Button } from "@mui/material";

const SidebarItem = ({ label, href, isActive, icon }) => {
  return (
    <Container
      variant="text"
      component="a"
      href={href}
      startIcon={icon}
      isActive={isActive}
    >
      {label}
    </Container>
  );
};

const Container = styled(Button)(({ isActive }) => ({
  display: "flex",
  justifyContent: "flex-start",
}));

export default SidebarItem;
