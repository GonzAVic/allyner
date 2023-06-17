import { useRouter } from "next/router";

// COMPONENTS
import Modal from "./Modal";

// OTHER
import useOrder from "utils/useOrder";

const CancelOrderModal = ({ orderId }) => {
  const router = useRouter();

  const { updateOrder } = useOrder(router.query.orderId);

  return (
    <Modal
      title="Cancel order"
      secondaryText="Are you sure you would like to cancel this  order?"
      actions={[
        {
          text: "Keep Orders",
          variant: "outlined",
          fn: () => updateOrder({ status: "CANCELED" }),
        },
      ]}
      withCancel
    />
  );
};

export default CancelOrderModal;
