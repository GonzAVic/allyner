// MATERIAL UI
import { TextField } from "@mui/material";

// COMPONENTS
import Modal from "./Modal";

const UpdateOrderStatusModal = () => {
  return (
    <Modal
      title="Update Order Status"
      actions={[
        {
          text: "Update Status",
          variant: "outlined",
        },
      ]}
      withCancel
    >

    </Modal>
  );
};

export default UpdateOrderStatusModal;
