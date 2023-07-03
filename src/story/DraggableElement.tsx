import { useDroppable, useDndMonitor, useDraggable } from "@dnd-kit/core";
import { Grid } from "@elliemae/ds-grid";

export const DraggableElement = ({ id, model, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${id}-${model.dsId}`,
    data: model,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        border: "2px solid blue",
      }
    : { border: "2px solid green" };

  return (
    <Grid
      cols={["auto", "min-content", "min-content", "min-content"]}
      gutter="xs"
      border="1px solid neutral-100"
      height="48px"
      alignItems="center"
      p="xxs"
      data-depth={model.depth}
      data-parentId={model.parent.dsId}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Grid>{model.plainItem.label}</Grid>
      {children}
    </Grid>
  );
};
