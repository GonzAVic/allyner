import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import { ClientContext } from "contexts/ClientContext";

function Page() {
  const router = useRouter();
  const { orderRepo, businessRepo } = useContext(ClientContext);
  const { business } = businessRepo;

  const { findClientOrders } = orderRepo;

  // useOrder(router.query.orderId);

  const [serviceReqs, setServiceReqs] = useState([]);

  useEffect(() => {
    if (!business) return;
    const onMount = async () => {
      const response = await findClientOrders();
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
  }, [business]);

  const handleRowClick = (rowData) => {
    router.push({
      pathname: "/orders/[orderId]",
      query: { orderId: rowData.id },
    });
  };

  return (
    <DefaultLayout title="Orders" userType="client">
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
}

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

export default Page;
