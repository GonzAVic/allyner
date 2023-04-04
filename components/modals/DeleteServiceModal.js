// COMPONENTS
import Modal from "./Modal";

const DeleteServiceModal = () => {
  return (
    <Modal
      title="Delete Service"
      secondaryText="Are you sure you would like to delete this service?"
      actions={[
        {
          text: "Keep Orders",
          variant: "outlined",
        },
      ]}
      withCancel
    />
  );
};

export default DeleteServiceModal;
