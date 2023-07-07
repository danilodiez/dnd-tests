import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Grid } from "@elliemae/ds-grid";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const DroppableContainer = ({ id, data, items, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${id}`,
    data,
  });
  const style = {
    border: isOver ? "1px solid green" : "1px solid black",
  };

  return (
    <SortableContext items={items.map(node => node.dsId)} strategy={verticalListSortingStrategy}>
    <Grid ref={setNodeRef} style={style}>
      {children}
    </Grid>
    </SortableContext>
  );
};
