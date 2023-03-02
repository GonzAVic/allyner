// MATERIAL UI
import { DataGrid } from "@mui/x-data-grid";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";

const customers = () => {
  return (
    <DefaultLayout title="Customers">
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

const columns = [
  { field: "id", headerName: "#Order", minWidth: 100 },
  {
    field: "firstName",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "age",
    headerName: "Has Account",
    flex: 1,
  },
  {
    field: "orders",
    headerName: "Orders",
    flex: 1,
  },
];

const rows = [
  { id: 1, lastName: "Snow", email: "harman@gmail.com", orders: 35 },
  { id: 2, lastName: "Lannister", email: "harman@gmail.com", orders: 42 },
  { id: 3, lastName: "Lannister", email: "harman@gmail.com", orders: 45 },
  { id: 4, lastName: "Stark", email: "harman@gmail.com", orders: 16 },
  { id: 5, lastName: "Targaryen", email: "harman@gmail.com", orders: null },
  { id: 6, lastName: "Melisandre", email: "nharman@gmail.com", orders: 150 },
  { id: 7, lastName: "Clifford", email: "harman@gmail.com", orders: 44 },
  { id: 8, lastName: "Frances", email: "harman@gmail.com", orders: 36 },
  { id: 9, lastName: "Roxie", email: "harman@gmail.com", orders: 65 },
];

export default customers;