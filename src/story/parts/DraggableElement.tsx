import { useDroppable, useDndMonitor, useDraggable } from "@dnd-kit/core";
import { Grid } from "@elliemae/ds-grid";
import { GripperVertical } from "@elliemae/ds-icons";
import { DSButtonV2 } from "@elliemae/ds-button";
import { useSortable } from "@dnd-kit/sortable";

export const DraggableElement = ({
  dragPrefix,
  model,
  children,
  node,
  ownerTree,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    setActivatorNodeRef,
    isDragging,
  } = useSortable({
    id: `${model?.id}`,
    data: { node, ownerTree },
  });

  const style = transform
    ? {
      transform: isDragging ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
      boxShadow: "rgba(0, 0, 0, 0.5) 0px 2px 4px 0px",
      cursor: "grab",
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
