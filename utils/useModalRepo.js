import { useState } from "react";

// MODALS
import DeleteServiceModal from "components/modals/DeleteServiceModal";
import UpdateOrderStatusModal from "components/modals/UpdateOrderStatusModal";
import CancelOrderModal from "components/modals/CancelOrderModal";

const useModalRepo = () => {
  const [currentModal, setCurrentModal] = useState(null);

  const open = (modalToOpen) => {
    let component = null;
    switch (modalToOpen) {
      case "DeleteService":
        component = <DeleteServiceModal />;
        break;
      case "UpdateOrderStatus":
        component = <UpdateOrderStatusModal />;
        break;
      case "CancelOrder":
        component = <CancelOrderModal />;
        break;

      default:
        break;
    }

    setCurrentModal(component);
  };

  const close = () => {
    setCurrentModal(null);
  };

  return {
    open,
    close,

    currentModal,
  };
};

export default useModalRepo;
