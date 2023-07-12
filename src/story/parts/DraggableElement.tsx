import React from "react";
import { useDraggable, DragOverlay } from "@dnd-kit/core";
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
    isDragging,
  } = useDraggable({
    id: `${model?.id}`,
    data: { node, ownerTree },
  });

  // store
  const selectedItems = useItemsStore((state) => state.selected);
  const setItems = useItemsStore((state) => state.setItems);

  // If we have files from 2 sections we won't allow the user to drag and drop
  const canDrag = React.useMemo(() => {
    if (selectedItems.sections.length) {
      const setOfSections = new Set(selectedItems.sections);
      const isCurrentDraggableSelected =
        selectedItems.sections.includes(section);
      const isSelectedFromMultipleSections = setOfSections.size < 2;

      return isSelectedFromMultipleSections && isCurrentDraggableSelected;
    }
    return true;
  }, [selectedItems, isDragging]);

  const stackedBoxesStyle = selectedItems.items?.length
    ? "1px 1px 0px #999, 2px 2px 0px #999, 3px 3px 0px #999, 4px 4px 0px #999, 5px 5px 0px #999, 6px 6px 0px #999"
    : "rgba(0, 0, 0, 0.5) 0px 2px 4px 0px";

  const style =
    transform && isDragging && canDrag
      ? {
          boxShadow: stackedBoxesStyle,
          cursor: "grab",
        }
      : { border: "" };

  const handleSelection = () => {
    let prevSelected = selectedItems.items;
    let sections = selectedItems.sections;
    if (selectedItems.items.includes(node)) {
      prevSelected = prevSelected.filter(
        (prevNode) => prevNode.dsId != node.dsId
      );
      const index = sections.indexOf(section);
      if (index !== -1) {
        sections.splice(index, 1);
      }
    } else {
      prevSelected.push(node);
      sections.push(section);
    }
    setItems(prevSelected, sections);
  };

  return (
    <>
      {isDragging && canDrag && (
        <DragOverlay>
          {selectedItems.items.length > 1 ? (
            <StackOfCards items={selectedItems.items}>{children}</StackOfCards>
          ) : (
            <SingleOverlay style={style}>{children}</SingleOverlay>
          )}
        </DragOverlay>
      )}
      <Grid
        cols={["36px", "1fr"]}
        // border="1px solid neutral-100"
        borderLeft={
          selectedItems.items?.includes(node)
            ? "4px brand-600 solid"
            : "4px solid rgba(30, 121, 194, 0.4)"
        }
        alignItems="center"
        my="2px"
        data-depth={model?.depth}
        ref={setNodeRef}
        {...attributes}
        onClick={handleSelection}
        style={
          isDragging
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
        {children}
      </Grid>
    </>
  );
};
