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

  // We need to detect globalDragging flag and selectedNodes list in order to handle multiple DnD
  const [isGlobalDragging, setIsGlobalDragging] = React.useState(false);
  const [selectedNodes, setSelectedNodes] = React.useState([]);

  // store
  const selectedItems = useItemsStore((state) => state.selected);
  const setItems = useItemsStore((state) => state.setItems);
  const resetStore = useItemsStore((state) => state.resetStore);

  // If we have files from 2 different sections we won't allow the user to drag and drop
  const canDrag = React.useMemo(() => {
    if (selectedItems.length) {
      const sections = selectedItems.map((item) => item.section);
      const setOfSections = new Set(sections);
      const isSameSection = setOfSections.size < 2;
      return isSameSection;
    }
    return true;
  }, [selectedItems, isItemDragging]);

  // Styles to set when elements are dragged
  const style =
    transform && isItemDragging && canDrag
      ? {
          boxShadow: "rgba(0, 0, 0, 0.5) 0px 2px 4px 0px",
          cursor: "grab",
        }
      : { border: "" };

  const handleSelection = () => {
    const sections = selectedItems.map((item) => item.section);

    // We reset the selection if we try to select from another folder or different section 
    if (!sections.includes(section)) {
      resetStore();
    }
    setItems({ node, section });
  };

  // We need this to highlight the grey background of items that are being dragged
  useDndMonitor({
    onDragStart() {
      setIsGlobalDragging(true);
    },
    onDragEnd() {
      setIsGlobalDragging(false);
    },
  });

  // Reads the selection from the store
  React.useEffect(() => {
    setSelectedNodes(selectedItems.map((item) => item.node));
  }, [selectedItems]);

  return (
    <>
      {isItemDragging && canDrag ? (
        <DragOverlay>
          {selectedItems.length > 1 ? (
            <StackOfCards items={selectedItems}>{children}</StackOfCards>
          ) : (
            <SingleOverlay style={style}>{children}</SingleOverlay>
          )}
        </DragOverlay>
      ) : null}
      <Grid
        cols={["32px", "1fr"]}
        // Shuttle like selection styles
        borderLeft={
          selectedNodes.includes(node)
            ? "4px solid brand-600"
            : "4px solid #A4D6FF"
        }
        alignItems="center"
        my="2px"
        ml="8px"
        data-depth={model?.depth}
        ref={setNodeRef}
        {...attributes}
        // Set the background of dragged element(s) to grey
        style={
          isItemDragging || (isGlobalDragging && selectedNodes.includes(node))
            ? {
                backgroundColor: "#eee",
                position: "relative",
                color: "#A8B1BE",
              }
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
