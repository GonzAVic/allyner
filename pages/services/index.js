import { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";

// MATERIAL UI
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import { GET_SERVICES } from "graphql/apiql";

const Services = () => {
  const [getServicesFn, getServicesFnHelper] = useLazyQuery(GET_SERVICES, {
    fetchPolicy: "network-only",
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    getServicesFn({ variables: { businessId: 2 } });
  }, []);

  useEffect(() => {
    if (getServicesFnHelper.loading) return;
    if (!getServicesFnHelper.data) return;
    const data = getServicesFnHelper.data.getServices;
    setServices(data);
  }, [getServicesFnHelper]);

  return (
    <DefaultLayout
      title="Services"
      secondaryText="Keep track of services and their status."
      cta={{ text: "Add Service", href: "/services/new-service" }}
    >
      <DataGrid
        rows={services}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
      />
    </DefaultLayout>
  );
};

const renderActions = (props) => {
  const { hasFocus, value } = props;
  return (
    <div>
      <Link href={`/services/${value}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
    </div>
  );
};

const columns = [
  { field: "title", headerName: "Title", width: 150 },
  { field: "status", headerName: "Status", width: 300 },
  { field: "status", headerName: "Actions", width: 300 },
  { field: "id", headerName: "Actions", renderCell: renderActions },
];

const rows = [
  { id: 1, title: "This is pedro" },
  { id: 2, title: "Lannister" },
  { id: 3, title: "Lannister" },
  { id: 4, title: "Stark" },
  { id: 5, title: "Targaryen" },
  { id: 6, title: "Melisandre" },
  { id: 7, title: "Clifford" },
  { id: 8, title: "Frances" },
  { id: 9, title: "Roxie" },
];

export default Services;
