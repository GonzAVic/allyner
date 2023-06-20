import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { DataGrid } from "@mui/x-data-grid";

// COMPONENTS
import NullState from "components/NullState";
import DefaultLayout from "components/layout/DefaultLayout";
import { BusinessContext } from "contexts/BusinessContext";

const Page = () => {
  const router = useRouter();
  const { businessRepo } = useContext(BusinessContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    businessRepo.findBusinessCustomers().then((result) => {
      const customersOrders = JSON.parse(result);

      const customers = [];
      for (const [key, value] of Object.entries(customersOrders)) {
        const name = () => {
          if (key.includes("@")) return "---";
          else return `${value[0].firstname} ${value[0].lastname}`;
        };
        customers.push({
          id: key,
          email: value[0].email,
          name: name(),
          hasAccount: !key.includes("@") ? "Yes" : "No",
          totalOrders: value.length - 1,
        });
      }
      setData(customers);
    });
  }, []);

  const handleRowClick = (rowData) => {
    router.push({
      pathname: "/app/customers/[customerId]",
      query: { customerId: rowData.id },
    });
  };

  return (
    <DefaultLayout title="Customers">
      {!data.length && (
        <NullState
          primaryText="No Customer Data Found"
          secondaryText="Google is waiting for some order."
        />
      )}
      {Boolean(data.length) && (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onRowClick={handleRowClick}
        />
      )}
    </DefaultLayout>
  );
};

const columns = [
  { field: "id", headerName: "#Order", minWidth: 100 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "hasAccount",
    headerName: "Has Account",
    flex: 1,
  },
  {
    field: "totalOrders",
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

export default Page;
