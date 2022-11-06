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
      cta={{ text: "Add Service", href: "/services/overview/?id=new" }}
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
  const { value } = props;
  return (
    <div>
      <Link href={`/services/overview/?id=${value}`}>
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
  { field: "id", headerName: "Actions", renderCell: renderActions },
];

export default Services;
