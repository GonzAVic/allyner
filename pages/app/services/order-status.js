import { useState } from "react";
import { resetServerContext } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

resetServerContext();

// MATERIAL UI
import { styled } from "@mui/system";
import { Typography, TextField, IconButton } from "@mui/material";

// COMPONENTS
import DefaultLayout from "components/layout/DefaultLayout";
import ServicesTabs from "components/ServicesTabs";
import PreviewLayout from "components/layout/PreviewLayout";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";

const Page = (result) => {
  const [collections, setCollections] = useState([
    {
      id: "1",
      title: "not started",
    },
    {
      id: "2",
      title: "completed",
    },
  ]);

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
  return (
    <DefaultLayout title="Service Booking">
      <ServicesTabs />

      <PreviewLayout previewComponent={"LALALALA"}>
        <Typography className="section-title" variant="subtitle1">
          Order Status
        </Typography>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {collections.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Status />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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

const Status = () => {
  return (
    <SContainer className="card">
      <DragIndicatorIcon />
      <TextField value="Todo" />
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
