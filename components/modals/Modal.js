import { useContext } from "react";

// MATERIAL UI
import { styled } from "@mui/system";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

// OTHER
import { AppContext } from "contexts/AppContext";

const Modal = ({
  title = null,
  secondaryText = null,
  actions = null,
  withCancel,
  children,
}) => {
  const { modalRepo } = useContext(AppContext);
  return (
    <Container open={true}>
      <DialogTitle>{title}</DialogTitle>
      {secondaryText && (
        <DialogContent>
          <DialogContentText>{secondaryText}</DialogContentText>
        </DialogContent>
      )}

      <Content>{children}</Content>

      <DialogActions>
        {actions.map((act, index) => {
          const {
            text = "",
            variant = "contained",
            fn = () => {},
            otherProps = {},
          } = act;
          return (
            <Button key={index} variant={variant} onClick={fn} {...otherProps}>
              {text}
            </Button>
          );
        })}
        {withCancel && (
          <Button variant="contained" color="error" onClick={modalRepo.close}>
            Cancel
          </Button>
        )}
      </DialogActions>
    </Container>
  );
};

const Container = styled(Dialog)({
  ".MuiDialogActions-root": {
    padding: "24px",
  },

  ".MuiDialog-paper": {
    borderRadius: 12,
  },
});

const Content = styled("div")({
  padding: "12px 24px",
});

export default Modal;
