import Link from "next/link";

// MATERIAL UI
import { styled } from "@mui/system";
import { Button } from "@mui/material";

const SidebarItem = ({
  label,
  href = "/services",
  isActive,
  icon,
  onClick,
}) => {
  if (onClick)
    return (
      <Container variant="text" startIcon={icon} onClick={onClick}>
        {label}
      </Container>
    );

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
  marginTop: 4,
  marginBottom: 4,

  color: isActive ? "#3C64C5" : "#73839D",
  backgroundColor: isActive ? "rgba(114, 155, 255, 0.1)" : "initial",
}));

export default SidebarItem;
