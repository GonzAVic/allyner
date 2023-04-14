import { useState } from "react";

// MODALS
import DeleteServiceModal from "components/modals/DeleteServiceModal";
import UpdateOrderStatusModal from "components/modals/UpdateOrderStatusModal";
import CancelOrderModal from "components/modals/CancelOrderModal";
import CropImageModal from "components/modals/CropImageModal";

const useModalRepo = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const [ctx, setCtx] = useState(); // { data: value, data2: value }

  const open = (modalToOpen, ctx) => {
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
      case "CropImage":
        component = <CropImageModal />;
        break;

      default:
        break;
    }

    setCurrentModal(component);
    if (ctx) setCtx(ctx);
  };

  const close = () => {
    setCurrentModal(null);
  };

  return {
    open,
    close,

    currentModal,
    ctx,
  };
};

export default useModalRepo;
