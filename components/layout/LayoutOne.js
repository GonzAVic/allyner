// MATERIAL UI
import { styled } from "@mui/system";

const LayoutOne = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled("div")({
  display: "flex",
  background: "red",
  height: "100vh",
  width: "100vw",
});

export default LayoutOne;
