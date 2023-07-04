import { useDroppable, useDndMonitor, useDraggable } from "@dnd-kit/core";
import { Grid } from "@elliemae/ds-grid";
import { GripperVertical } from "@elliemae/ds-icons";
import { DSButtonV2 } from "@elliemae/ds-button";

export const DraggableElement = ({ dragPrefix, model, children, node }) => {
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } =
    useDraggable({
      id: `draggable-${dragPrefix}-${model.id}`,
      data: node,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        border: "2px solid blue",
      }
    : { border: "" };

  return (
    <Grid
      cols={["36px", "1fr"]}
      border="1px solid neutral-100"
      alignItems="flex-start"
      p="xxs"
      bg="white"
      data-depth={model?.depth}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <DSButtonV2
        buttonType="icon"
        aria-label="Drag and Drop Handler"
        {...listeners}
        ref={setActivatorNodeRef}
      >
        <GripperVertical />
      </DSButtonV2>
      {children}
    </Grid>
  );
};
