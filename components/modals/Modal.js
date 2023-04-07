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
import { AppContext } from "AppContext";

const Modal = ({
  title = null,
  secondaryText = null,
  actions = null,
  withCancel,
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

      <DialogActions>
        {actions.map((act) => {
          const {
            text = "",
            variant = "contained",
            fn = () => {},
            otherProps = {},
          } = act;
          return (
            <Button variant={variant} {...otherProps}>
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

export default Modal;
