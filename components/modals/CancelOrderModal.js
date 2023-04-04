// COMPONENTS
import Modal from "./Modal";

const CancelOrderModal = () => {
  return (
    <Modal
      title="Cancel order"
      secondaryText="Are you sure you would like to cancel this  order?"
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

export default CancelOrderModal;
