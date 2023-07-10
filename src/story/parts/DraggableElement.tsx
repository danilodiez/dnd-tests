import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { Grid } from "@elliemae/ds-grid";
import { GripperVertical } from "@elliemae/ds-icons";
import { DSButtonV2 } from "@elliemae/ds-button";
import { FileItem } from "./items";

export const DraggableElement = ({ model, children, node, ownerTree, setSelection, selected }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    setActivatorNodeRef,
    isDragging,
  } = useDraggable({
    id: `${model?.id}`,
    data: { node, ownerTree },
  });

  const style = transform
    ? {
        boxShadow: "rgba(0, 0, 0, 0.5) 0px 2px 4px 0px", 
        cursor: "grab",
      }
    : { border: "" };

    const handleSelection = () => {
      let prevSelected = selected;
      if (selected.includes(node)) { 
        prevSelected = prevSelected.filter(prevNode => prevNode.dsId != node.dsId);
      } else {
        prevSelected.push(node);
      }
      setSelection(prevSelected);
    }
  return (
    <>
      {isDragging && (
        <DragOverlay>
          <Grid
            cols={["36px", "1fr"]}
            border="1px solid neutral-100"
            alignItems="center"
            p="xxs"
            bg="white"
            data-depth={model?.depth}
            style={style}
          >
            <DSButtonV2 buttonType="icon" aria-label="Drag and Drop Handler">
              <GripperVertical />
            </DSButtonV2>
            {children}
          </Grid>
        </DragOverlay>
      )}
      <Grid
        cols={["24px", "36px", "1fr"]}
        border="1px solid neutral-100"
        alignItems="center"
        p="xxs"
        bg="white"
        data-depth={model?.depth}
        ref={setNodeRef}
        style={style}
        {...attributes}
      >
        <input type="checkbox" onClick={handleSelection}></input>
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
    </>
  );
};
