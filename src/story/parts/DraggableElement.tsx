import React from "react";
import { useDraggable, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { Grid } from "@elliemae/ds-grid";
import { GripperVertical } from "@elliemae/ds-icons";
import { DSButtonV2 } from "@elliemae/ds-button";
import { useItemsStore } from "../store";
import { SingleOverlay, StackOfCards } from "./items/overlays";

export const DraggableElement = ({
  model,
  children,
  node,
  ownerTree,
  section,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    setActivatorNodeRef,
    isDragging: isItemDragging,
  } = useDraggable({
    id: `${model?.id}`,
    data: { node, ownerTree },
  });

  const [isGlobalDragging, setIsGlobalDragging] = React.useState(false);
  const [borderStyle, setBorderStyle] = React.useState("");
  const [selectedNodes, setSelectedNodes] = React.useState([]);

  // store
  const selectedItems = useItemsStore((state) => state.selected);
  const setItems = useItemsStore((state) => state.setItems);

  // If we have files from 2 sections we won't allow the user to drag and drop
  const canDrag = React.useMemo(() => {
    if (selectedItems.length) {
      const sections = selectedItems.map((item) => item.section);
      const setOfSections = new Set(sections);
      const isSameSection = setOfSections.size < 2;
      return isSameSection;
    }
    return true;
  }, [selectedItems, isItemDragging]);

  const style =
    transform && isItemDragging && canDrag
      ? {
          boxShadow: "rgba(0, 0, 0, 0.5) 0px 2px 4px 0px",
          cursor: "grab",
        }
      : { border: "" };

  const handleSelection = () => {
    setItems({ node, section });
  };
  // We need this to highlight the gray background of items that are being dragged
  useDndMonitor({
    onDragStart() {
      setIsGlobalDragging(true);
    },
    onDragEnd() {
      setIsGlobalDragging(false);
    },
  });

  React.useEffect(() => {
    setSelectedNodes(selectedItems.map((item) => item.node));
  }, [selectedItems]);
  return (
    <>
      {isItemDragging && canDrag && (
        <DragOverlay>
          {selectedItems.length > 1 ? (
            <StackOfCards items={selectedItems}>{children}</StackOfCards>
          ) : (
            <SingleOverlay style={style}>{children}</SingleOverlay>
          )}
        </DragOverlay>
      )}
      <Grid
        cols={["32px", "1fr"]}
        borderLeft={
          selectedNodes.includes(node)
            ? "4px solid brand-600"
            : "4px solid rgba(30, 121, 194, 0.4)"
        }
        alignItems="center"
        my="2px"
        data-depth={model?.depth}
        ref={setNodeRef}
        {...attributes}
        style={
          isItemDragging || (isGlobalDragging && selectedNodes.includes(node))
            ? { backgroundColor: "#eee", position: "relative" }
            : { backgroundColor: "#fff", position: "relative" }
        }
      >
        <DSButtonV2
          buttonType="icon"
          aria-label="Drag and Drop Handler"
          {...listeners}
          ref={setActivatorNodeRef}
        >
          <GripperVertical />
        </DSButtonV2>
        <div onClick={handleSelection}>{children}</div>
      </Grid>
    </>
  );
};
