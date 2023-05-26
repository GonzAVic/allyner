import { useContext } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

// MATERIAL UI
import { TextField, MenuItem } from "@mui/material";

// COMPONENTS
import Modal from "./Modal";

// OTHER
import useServiceReq from "utils/useServiceReq";
import { BusinessContext } from "contexts/BusinessContext";

const UpdateOrderStatusModal = () => {
  const router = useRouter();
  const { businessRepo } = useContext(BusinessContext);
  const { updateServiceReq } = useServiceReq(router.query.orderId);
  const { business } = businessRepo;

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      status: "",
    },
    // validationSchema: createSigninSchema(),
    onSubmit: (values) => {
      console.log("-> values: ", values);
      updateServiceReq(
        { status: values.status },
        router.query.orderId,
        business.id
      );
    },
  });

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
        {business.additionalSettings.serviceStatuses.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Modal>
  );
};

export default UpdateOrderStatusModal;
