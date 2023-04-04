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
    />
  );
};

export default UpdateOrderStatusModal;
