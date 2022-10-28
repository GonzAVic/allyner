import { useEffect, useState } from "react";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";

// MATERIAL UI
import { DataGrid } from "@mui/x-data-grid";

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
const columns = [
  { field: "id", headerName: "ID" },
  { field: "title", headerName: "Title", width: 150 },
  { field: "description", headerName: "Description", width: 300 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: <div>LALALALA</div> },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default Services;
