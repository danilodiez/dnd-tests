import React from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { styled } from "@elliemae/ds-system";
import { useDroppable, useDndMonitor, useDraggable } from "@dnd-kit/core";

const StyledBoxWrapper = styled(Grid)``;

const rows = ["auto", "1fr"];
export const BoxWithTitle = React.memo(
  ({ title, children, dropZone , nodes }) => {
    const { isOver, setNodeRef } = useDroppable({
      id: `droppable-${dropZone}`,
      data: nodes,
    });
    const style = {
      border: isOver ? "2px solid green" : "2px solid black",
    };
    useDndMonitor({
      onDragEnd(e) {
        if (
          e.over.id === "droppable-unassigned" &&
          e.active.id.includes("draggable-attachment")
        ) {
          const newNode = {
            id: e.active.id,
            originalNodeData: {
              id: e.active.id,
              name: `File${e.active.id}`,
              isGroup: false,
            },
          };
          
          nodes.addNode(newNode, { parent: nodes.getRoot() });
          e.active.data.current.removeNode(e.active.data.current.dsId);
        }
      },
    });
    return (
      <StyledBoxWrapper
        border="2px solid neutral-600"
        borderRadius="xxs"
        p="xxs"
        m="xxs"
        gutter="xs"
        width="50%"
        ref={setNodeRef}
        style={style}
      >
        <Grid>
          <DSTypography variant="h4">{title}</DSTypography>
        </Grid>
        <Grid>{children}</Grid>
      </StyledBoxWrapper>
    );
  }
);
