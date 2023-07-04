import { useContext } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

// MATERIAL UI
import { TextField, MenuItem } from "@mui/material";

// COMPONENTS
import Modal from "./Modal";

// OTHER
import useOrder from "utils/useOrder";
import useService from "utils/useService";
import { concatStatuses } from "utils/utils";
import { BusinessContext } from "contexts/BusinessContext";

const UpdateServiceStatusModal = ({ initialStatus }) => {
  const router = useRouter();
  const { updateService } = useService(router.query.id);

  console.log("-> initialStatus: ", initialStatus);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      isActive: initialStatus || "",
    },
    // validationSchema: createSigninSchema(),
    onSubmit: (values) => {
      updateService({ isActive: values.isActive });
    },
  });

  return (
    <Modal
      title="Update Service Status"
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
        name="isActive"
        value={formik.values.isActive}
        onChange={formik.handleChange}
        sx={{ textTransform: "capitalize" }}
        select
      >
        {STATUS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Modal>
  );
};

const STATUS = [
  {
    value: true,
    label: "Active",
  },
  {
    value: false,
    label: "Inactive",
  },
];

export default UpdateServiceStatusModal;
