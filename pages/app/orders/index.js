import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import NullState from "components/NullState";

// OTHER
import useServiceReq from "utils/useServiceReq";

const orders = () => {
  const router = useRouter();

  const { findBusinessServiceReqs } = useServiceReq(router.query.orderId);

  const [serviceReqs, setServiceReqs] = useState([]);

  useEffect(() => {
    const onMount = async () => {
      const response = await findBusinessServiceReqs(2);
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
  }, []);

  const handleRowClick = (rowData) => {
    router.push({
      pathname: "/app/orders/[orderId]",
      query: { orderId: rowData.id },
    });
  };

  return (
    <DefaultLayout title="Orders" cta={{ text: "Create Order" }}>
      <Container className="pedro">
        {!serviceReqs.length && (
          <NullState
            primaryText="No Orders Found"
            secondaryText="Google is waiting for some order."
          />
        )}
        {Boolean(serviceReqs.length) && (
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
        )}
      </Container>
    </DefaultLayout>
  );
};

const ServiceStatus = () => {
  return <Chip label="In Progress" />;
};

const columns = [
  { field: "id", headerName: "#Order", minWidth: 100 },
  {
    field: "serviceName",
    headerName: "Service",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "Customer Name",
    flex: 1,
  },
  {
    field: "createdAt",
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

const Container = styled("div")({
  display: "contents",
});

export default orders;
