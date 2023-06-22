import { useContext } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

// MATERIAL UI
import { TextField, MenuItem } from "@mui/material";

// COMPONENTS
import Modal from "./Modal";

// OTHER
import useOrder from "utils/useOrder";
import { concatStatuses } from "utils/utils";
import { BusinessContext } from "contexts/BusinessContext";

const UpdateOrderStatusModal = ({ initialStatus }) => {
  const router = useRouter();
  const { businessRepo } = useContext(BusinessContext);
  const { updateOrder } = useOrder(router.query.orderId);
  const { business } = businessRepo;

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      status: initialStatus || "",
    },
    // validationSchema: createSigninSchema(),
    onSubmit: (values) => {
      updateOrder({ status: values.status }, router.query.orderId);
    },
  });

  const statutes = business.additionalData.serviceStatuses || [];

  return (
    <Modal
      title="Update Order Status"
      actions={[
        {
          text: "Update Status",
          variant: "outlined",
          fn: formik.submitForm,
        },
      ]}
      withCancel
    >
      <TextField
        name="status"
        value={formik.values.status}
        onChange={formik.handleChange}
        sx={{ textTransform: "capitalize" }}
        select
      >
        {concatStatuses(statutes).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Modal>
  );
};

export default UpdateOrderStatusModal;
