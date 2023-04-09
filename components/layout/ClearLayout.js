// MATERIAL UI
import { styled } from "@mui/system";

// OTHER
import Asset1 from "assets/asset-1.svg";
import Asset2 from "assets/asset-2.svg";
import Asset3 from "assets/asset-3.svg";
import Asset4 from "assets/asset-4.svg";

const ClearLayout = ({ children }) => {
  return (
    <Container>
      <Asset sx={{ top: -130, left: -40 }} src={Asset1.src} />
      <Asset sx={{ top: -80, right: -40 }} src={Asset2.src} />
      <Asset sx={{ bottom: -130, left: -40 }} src={Asset3.src} />
      <Asset sx={{ bottom: -130, right: -40 }} src={Asset4.src} />
      {children}
    </Container>
  );
};

const Container = styled("div")({
  width: "calc(100vw - 40px)",
  maxWidth: 360,
  margin: "auto",
  marginTop: 100,

  // ".logo": {
  //   margin: "auto",
  //   display: "block",
  // },
});

const Asset = styled("img")({
  position: "absolute",
  zIndex: -1,
});

export default ClearLayout;
