import { useEffect, useState } from "react";
import Link from "next/link";
import { useLazyQuery } from "@apollo/client";

// MATERIAL UI
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, TextField, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LayersIcon from "@mui/icons-material/Layers";
import DeleteIcon from "@mui/icons-material/Delete";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import BusinessHOC from "components/BusinessHOC";
import { serviceStatus } from "utils/constants";
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
    <BusinessHOC>
      <DefaultLayout
        title="Services"
        secondaryText="Keep track of services and their status."
        cta={{
          text: "Add Service",
          href: "/b-dashboard/services/overview/?id=new",
        }}
      >
        <DataGrid
          rows={services}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
        />
      </DefaultLayout>
    </BusinessHOC>
  );
};

const renderActions = (props) => {
  const { value } = props;
  return (
    <div>
      <Link href={`/b-dashboard/services/overview/?id=${value}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton>
        <LayersIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
// serviceStatus
const renderStatus = (props) => {
  const { value } = props;
  return (
    <TextField value={value} sx={{ mb: 0 }} select>
      {serviceStatus().map((e) => (
        <MenuItem key={e.value} value={e.value}>
          {e.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

const columns = [
  { field: "title", headerName: "Title", flex: 2 },
  { field: "status", headerName: "Status", renderCell: renderStatus, flex: 1 },
  { field: "id", headerName: "Actions", renderCell: renderActions, flex: 1 },
];

export default Services;
