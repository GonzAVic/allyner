// COMPONENTS
import { OtherHouses } from "@mui/icons-material";
import Modal from "./Modal";

// OTHER
import useService from "utils/useService";

const DeleteServiceModal = ({ serviceId }) => {
  const { deleteService } = useService();
  console.log("-> serviceId: ", serviceId);
  return (
    <Modal
      title="Delete Service"
      secondaryText="Are you sure you would like to delete this service?"
      actions={[
        {
          text: "Yes",
          variant: "outlined",
          fn: async () => {
            await deleteService(serviceId);
            location.reload();
          },
        },
      ]}
      withCancel
    />
  );
};

export default DeleteServiceModal;
