import { useState } from "react";
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
import OderCard from "components/OrderCard";

const Page = () => {
  const [collections, setCollections] = useState(["completed", "not-started"]);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      collections,
      result.source.index,
      result.destination.index
    );

    setCollections(items);
  };

  const addStatus = () => {
    setCollections([...collections, "new status"]);
  };

  return (
    <DefaultLayout title="Service Booking">
      <ServicesTabs />

      <PreviewLayout previewComponent={<OderCard />}>
        <Typography className="section-title" variant="subtitle1">
          Order Status
        </Typography>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {collections.map((status, index) => (
                  <Draggable key={status} draggableId={status} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Status value={status} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Button variant="dashed" onClick={addStatus} fullWidth>
          Add new status
        </Button>
      </PreviewLayout>
    </DefaultLayout>
  );
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Status = (value) => {
  return (
    <SContainer className="card">
      <DragIndicatorIcon />
      <TextField value={value.value} />
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </SContainer>
  );
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
