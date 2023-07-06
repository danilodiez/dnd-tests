import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Grid } from "@elliemae/ds-grid";

export const DroppableContainer = ({ id, data, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${id}`,
    data,
  });
  const style = {
    border: isOver ? "1px solid green" : "1px solid black",
  };

  return (
    <Grid ref={setNodeRef} style={style}>
      {children}
    </Grid>
  );
};
