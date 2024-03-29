import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import NullState from "components/NullState";

// OTHER
import { BusinessContext } from "contexts/BusinessContext";
import { AppContext } from "contexts/AppContext";
import useUser from "utils/useUser";

const Page = () => {
  const router = useRouter();
  const { orderRepo } = useContext(BusinessContext);
  const { modalRepo } = useContext(AppContext);

  const { findBusinessOrders } = orderRepo;

  const [orders, setOrders] = useState(null);
  const [ordersSelected, setOrdersSelected] = useState([]);

  useEffect(() => {
    const onMount = async () => {
      const response = await findBusinessOrders();
      const serviceRequests = response.map((r) => {
        return {
          id: r.id,
          serviceName: r.frozenService.name,
          createdAt: r.createdAt,
          userId: r.userId,
          status: r.status,
        };
      });
      setOrders(serviceRequests);
    };
    onMount();
  }, []);

  const handleRowClick = (rowData) => {
    router.push({
      pathname: "/app/orders/[orderId]",
      query: { orderId: rowData.id },
    });
  };

  const handleCancelOrders = () => {
    orderRepo.cancelMultipleOrders(ordersSelected);
  };

  const handleSelectedRowsChange = (ordersIdSelected) => {
    setOrdersSelected(ordersIdSelected);
  };

  return (
    <DefaultLayout
      title="Orders"
      cta={
        ordersSelected.length
          ? {
              text: "Update Status",
              fn: () =>
                modalRepo.open("UpdateOrderStatus", {
                  ordersIds: ordersSelected,
                }),
            }
          : null
      }
      moreOptions={
        ordersSelected.length
          ? [{ text: "Cancel Orders", fn: handleCancelOrders }]
          : null
      }
    >
      <Container className="pedro">
        {orders !== null && !orders.length && (
          <NullState
            primaryText="No Orders Found"
            secondaryText="Google is waiting for some order."
          />
        )}
        {orders == null && <DataGrid loading rows={[]} columns={columns} />}
        {orders !== null && Boolean(orders.length) && (
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            onRowClick={handleRowClick}
            onSelectionModelChange={handleSelectedRowsChange}
          />
        )}
      </Container>
    </DefaultLayout>
  );
};

const ServiceStatus = ({ row }) => {
  return <Chip label={row.status} />;
};

const ClientName = ({ row }) => {
  const { user } = useUser(row.userId);
  if (!user) return "COPY: No user";
  return <Typography>{user.firstname + " " + user.lastname}</Typography>;
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
    renderCell: ClientName,
  },
  {
    field: "createdAt",
    headerName: "Order Date",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    minWidth: 200,
    renderCell: ServiceStatus,
  },
];

const Container = styled("div")({
  display: "contents",
});

export default Page;
