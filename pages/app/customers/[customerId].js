import { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, TextField, Chip, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ListGroup from "components/ListGroup";
import Uploader from "components/Uploader";
import FileCard from "components/FileCard";

// OTHER
import useUser from "utils/useUser";
import { timezones } from "utils/constants";
import { BusinessContext } from "contexts/BusinessContext";
import useOrder from "utils/useOrder";

const CustomerDetails = () => {
  const router = useRouter();

  const { businessRepo } = useContext(BusinessContext);

  const userId = router.query.customerId;
  const { user, updateUser } = useUser(userId.includes("@") ? null : userId);
  const { findClientOrders } = useOrder(null, {
    userId: router.query.customerId,
    businessId: businessRepo.business.id,
  });

  const [serviceReqs, setServiceReqs] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user?.firstname,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      profilePicture: user?.profilePicture,
      phoneNumber: user?.phoneNumber,
      additionalInfo: user ? user.additionalInfo || {} : {},
      // timezone: user?.timezone || "",
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  useEffect(() => {
    const onMount = async () => {
      const response = await findClientOrders();
      if (!response) return;

      const serviceRequests = response.map((r) => {
        return {
          id: r.id,
          serviceName: r.frozenService.name,
          createdAt: r.createdAt,
          status: "Pending",
        };
      });
      setServiceReqs(serviceRequests);
    };
    onMount();
  }, [user?.id]);

  const handleProfilePictureChange = (profilePictureUrl) => {
    formik.setFieldValue("profilePicture", profilePictureUrl);
  };

  const handleRowClick = (rowData) => {
    router.push({
      pathname: "/app/orders/[orderId]",
      query: { orderId: rowData.id },
    });
  };

  const isGuestUser = userId.includes("@");

  return (
    <DefaultLayout
      title="Customer Details"
      backHref="/app/customers"
      formik={formik}
    >
      <Content>
        <div>
          <Typography className="section-title" variant="subtitle1">
            Customer details
          </Typography>
          <Box className="card">
            {!isGuestUser && (
              <>
                <Typography variant="subtitle1">Name</Typography>
                <TextField
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                />
              </>
            )}

            <Typography variant="subtitle1">Email</Typography>
            <TextField
              name="email"
              value={isGuestUser ? userId : formik.values.email}
              onChange={formik.handleChange}
              sx={{ mb: "8px !important" }}
            />
            <Typography color="text.secondary">
              We’ll use this email if we need to contact you about your Allyner
              account.
            </Typography>

            {!isGuestUser && (
              <>
                <Typography variant="subtitle1">Phone Number</Typography>
                <TextField
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />

                <Typography variant="subtitle1">Profile Picture</Typography>
                {formik.values.profilePicture ? (
                  <FileCard
                    fileUrl={formik.values.profilePicture}
                    onDelete={() => handleProfilePictureChange("")}
                  />
                ) : (
                  <Uploader
                    onUploadedFinished={handleProfilePictureChange}
                    withCropper
                  />
                )}
              </>
            )}

            {!isGuestUser &&
              Object.entries(formik.values.additionalInfo).map((aI) => {
                return (
                  <>
                    <Typography variant="subtitle1">{aI[0]}</Typography>
                    <TextField
                      name={`additionalInfo["${aI[0]}"]`}
                      value={formik.values.additionalInfo[`${aI[0]}`]}
                      onChange={formik.handleChange}
                    />
                  </>
                );
              })}
          </Box>
        </div>
        <div>
          {!isGuestUser && (
            <>
              <Typography className="section-title" variant="subtitle1">
                Customer Activity
              </Typography>
              <ListGroup
                data={[
                  { label: "Sign Up Date", value: user?.createdAt },
                  {
                    label: "Timezone",
                    render: () => {
                      return (
                        <TextField
                          name="timezone"
                          value={formik.values.timezone}
                          onChange={formik.handleChange}
                          sx={{ textTransform: "capitalize" }}
                          select
                        >
                          {timezones().map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      );
                    },
                  },
                ]}
              />
            </>
          )}
        </div>
      </Content>

      <Typography className="section-title" variant="subtitle1">
        Orders
      </Typography>
      <DataGrid
        rows={serviceReqs}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onRowClick={handleRowClick}
      />
    </DefaultLayout>
  );
};

const Content = styled("div")({
  display: "grid",
  gridTemplateColumns: "40% 1fr",
  gap: 24,
  marginBottom: 32,
});

const ServiceStatus = () => {
  return <Chip label="In Progress" />;
};

const columns = [
  { field: "id", headerName: "#Order ID", minWidth: 100 },
  {
    field: "serviceName",
    headerName: "Service",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Order Date",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  // {
  //   field: "fullName",
  //   headerName: "Status",
  //   sortable: false,
  //   minWidth: 200,
  //   renderCell: ServiceStatus,
  // },
];

export default CustomerDetails;
