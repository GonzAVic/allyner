// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, Box, TextField, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";

const CustomerDetails = () => {
  const activityData = [
    { label: "Sign Up Date", value: "July 8, 2022" },
    { label: "Last Sign in Location", value: "Makassar, Indonesia" },
    { label: "Timezone", value: "GMT + 8:00" },
  ];
  return (
    <DefaultLayout title="Customer Details" backHref="/app/customers">
      <Content>
        <div>
          <Typography className="section-title" variant="subtitle1">
            Customer details
          </Typography>
          <Box className="card">
            <Typography variant="subtitle1">Name</Typography>
            <TextField value="Harman Walia" />

            <Typography variant="subtitle1">Email</Typography>
            <TextField value="Harman Walia" sx={{ mb: "8px !important" }} />
            <Typography color="text.secondary">
              We’ll use this email if we need to contact you about your Allyner
              account.
            </Typography>

            <Typography variant="subtitle1">Phone Number</Typography>
            <TextField value="Harman Walia" />

            <Typography variant="subtitle1">Profile Picture</Typography>
          </Box>
        </div>
        <div>
          <Typography className="section-title" variant="subtitle1">
            Customer Activity
          </Typography>
          <ListGroup data={activityData} />
        </div>
      </Content>

      <Typography className="section-title" variant="subtitle1">
        Orders
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
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

const ListGroup = ({ data }) => {
  return (
    <div>
      {data.map((d, index) => {
        return (
          <ListGroupItem key={index} className="list-group-item">
            <Typography>{d.label}</Typography>
            <Typography>{d.value}</Typography>
          </ListGroupItem>
        );
      })}
    </div>
  );
};

const ListGroupItem = styled("div")({
  padding: "20px 32px",
  background: "#FFFFFF",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  borderTop: "2px solid #eff1f5",

  "&:first-child": {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTop: "none",
  },

  "&:last-child": {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
const ServiceStatus = () => {
  return <Chip label="In Progress" />;
};

const columns = [
  { field: "id", headerName: "#Order", minWidth: 100 },
  {
    field: "firstName",
    headerName: "Service",
    flex: 1,
  },
  {
    field: "age",
    headerName: "Order Date",
    flex: 1,
  },
  {
    field: "fullName",
    headerName: "Status",
    sortable: false,
    minWidth: 200,
    renderCell: ServiceStatus,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default CustomerDetails;
