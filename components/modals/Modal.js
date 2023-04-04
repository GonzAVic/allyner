import React from "react";

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

const Modal = ({
  title = null,
  secondaryText = null,
  actions = null,
  withCancel,
}) => {
  return (
    <Container
      open={true}
      // onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{secondaryText}</DialogContentText>
      </DialogContent>

      <DialogActions>
        {actions.map((act) => {
          const {
            text = "",
            variant = "contained",
            fn = () => {},
            otherProps = {},
          } = act;
          return <Button variant={variant}>{text}</Button>;
        })}
        {withCancel && (
          <Button variant="contained" color="error">
            Cancel
          </Button>
        )}
      </DialogActions>
    </Container>
  );
};

const Container = styled(Dialog)({});

export default Modal;
