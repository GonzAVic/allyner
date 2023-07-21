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

  const [data, setData] = useState(null);

  useEffect(() => {
    businessRepo.findBusinessCustomers().then((result) => {
      const customersOrders = JSON.parse(result);

      const customers = [];
      for (const [key, value] of Object.entries(customersOrders)) {
        const name = () => {
          if (key.includes("@")) return "-";
          else return `${value[0].firstname} ${value[0].lastname}`;
        };
        const uCreatedAt = new Date(value[0].createdAt);
        const signupDate = value[0].createdAt
          ? `${uCreatedAt.getDate()}/${uCreatedAt.getMonth()}/${uCreatedAt.getFullYear()}`
          : "-";
        customers.push({
          id: value[0].email,
          name: name(),
          hasAccount: !key.includes("@") ? "Yes" : "No",
          totalOrders: value.length - 1,
          signupDate,
          userId: key.includes("@") ? value[0].email : key,
        });
      }
      setData(customers);
    });
  }, []);

  const handleRowClick = (rowData) => {
    console.log("-> rowData: ", rowData);
    router.push({
      pathname: "/app/customers/[customerId]",
      query: { customerId: rowData.row.userId },
    });
  };

  return (
    <DefaultLayout title="Customers">
      {data !== null && !data.length && (
        <NullState
          primaryText="No Customer Data Found"
          secondaryText="Google is waiting for some order."
        />
      )}
      {data == null && <DataGrid loading rows={[]} columns={columns} />}
      {data !== null && Boolean(data.length) && (
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
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "id",
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
  {
    field: "signupDate",
    headerName: "Sign Up Date",
    flex: 1,
  },
];

export default Page;
