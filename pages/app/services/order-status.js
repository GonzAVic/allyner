import { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import { resetServerContext } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

resetServerContext();

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField, IconButton, Button } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServicesTabs from "components/ServicesTabs";
import PreviewLayout from "components/layout/PreviewLayout";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import ServiceCard from "components/service/ServiceCard";

// OTHER
import useServiceReq from "utils/useServiceReq";
import { BusinessContext } from "contexts/BusinessContext";

const Page = () => {
  const { businessRepo, orderRepo } = useContext(BusinessContext);
  const { business, updateBusiness } = businessRepo;
  const { findBusinessOrders } = orderRepo;

  const [serviceReqs, setServiceReqs] = useState([]);
  const [statuses, setStatuses] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      statuses: statuses || [],
    },
    // validationSchema: createLoginSchema(),
    onSubmit: (values) => {
      const serviceStatuses_ = values.statuses.map((s) => s.label);
      const attributes = {
        additionalData: JSON.stringify({
          ...business.additionalData,
          serviceStatuses: serviceStatuses_,
        }),
      };
      updateBusiness(attributes);
    },
  });

  useEffect(() => {
    const onMount = async () => {
      const response = await findBusinessOrders();
      setServiceReqs(response);
    };
    onMount();
  }, []);

  useEffect(() => {
    if (!business) return;
    const serviceStatuses_ = business.additionalData.serviceStatuses || [];
    const serviceStatuses = serviceStatuses_.map((ss) => ({
      id: String(Math.random()),
      label: ss,
    }));

    // formik.setFieldValue("statuses", serviceStatuses);
    setStatuses(serviceStatuses);
  }, [business]);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      formik.values.statuses,
      result.source.index,
      result.destination.index
    );

    formik.setFieldValue("statuses", items);
  };

  const addStatus = () => {
    formik.setFieldValue("statuses", [
      ...formik.values.statuses,
      { id: String(Math.random()), label: "new status" },
    ]);
  };

  const deleteStatus = (id) => {
    const index = formik.values.statuses.findIndex((s) => {
      return s.id === id;
    });
    console.log("-> index: ", index);
    const newStatusesArray = formik.values.statuses.map((s) => s);
    newStatusesArray.splice(index, 1);
    formik.setFieldValue("statuses", newStatusesArray);
  };

  return (
    <DefaultLayout title="Service Booking" formik={formik}>
      <ServicesTabs />
      <PreviewLayout
        previewComponent={<ServiceCard status="Active" />}
        noTopSpace
        zoomOut
      >
        <Typography className="section-title" variant="subtitle1">
          Order Status
        </Typography>

        <Status value="To do" />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {formik.values.statuses.map((status, index) => {
                  return (
                    <Draggable
                      key={status.id}
                      draggableId={status.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Status
                            id={status.id}
                            formik={formik}
                            onDelete={deleteStatus}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Button variant="dashed" onClick={addStatus} fullWidth>
          Add new status
        </Button>
        <Status value="Complete" />
      </PreviewLayout>
    </DefaultLayout>
  );
};

const Status = ({ id, formik = null, value, onDelete }) => {
  const index = 0;
  if (!value)
    index = formik.values.statuses.findIndex((s) => {
      return s.id === id;
    });

  if (index === -1) return null;
  return (
    <SContainer className="card">
      <DragIndicatorIcon />
      <TextField
        name={`statuses[${index}].label`}
        value={value || formik.values.statuses[index].label}
        onChange={value ? () => {} : formik.handleChange}
      />
      {!value && (
        <IconButton onClick={() => onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      )}
    </SContainer>
  );
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: "16px !important",
  marginBottom: 6,
  marginTop: 6,
});

export default Page;
