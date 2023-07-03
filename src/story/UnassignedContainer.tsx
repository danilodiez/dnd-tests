import { useState, useCallback } from "react";
import { useDSTree } from "@elliemae/ds-tree-model";
import { Grid } from "@elliemae/ds-grid";
import { DSButtonV2 } from "@elliemae/ds-button";
import { Add, MoreOptionsVert, CloseMedium } from "@elliemae/ds-icons";
import { useDroppable, useDndMonitor, useDraggable } from "@dnd-kit/core";
import { DraggableElement } from "./DraggableElement";

const data = {
  dsId: "__root",
  label: "root",
  subitems: [
    {
      dsId: "1",
      label: "Unassigned 1",
      subitems: [],
    },
    {
      dsId: "2",
      label: "Unassigned 2",
      subitems: [],
    },
    {
      dsId: "3",
      label: "Unassigned 3",
      subitems: [],
    },
  ],
};

const options = {
  getUniqueId: (item) => item.dsId,
};

export const UnassignedContainer = () => {
  const { addNode, getRoot, removeNode, getPath } = useDSTree(data, options);
  const [currentNode, setCurrentNode] = useState(getRoot());
  const [availableId, setAvailableId] = useState(4);
  const addNewNode = useCallback(
    (parent) => {
      addNode(
        {
          dsId: availableId.toString(),
          label: `Unassigned ${availableId}`,
        },
        { parent }
      );
      setAvailableId(availableId + 1);
    },
    [addNode, availableId]
  );

  useDndMonitor({
    onDragEnd(e) {
      if (e.over.id === 'droppable-unassigned' && e.active.id.includes('draggable-folder')) {
        addNewNode(currentNode);
      }
    },
  });
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-unassigned`,
  });
  const style = {
    border: isOver ? "2px solid green" : "2px solid red",
  };
  return (
    <Grid>
      <Grid gutter="xs" cols={["350px"]} ref={setNodeRef} style={style}>
        {currentNode.children.map((model) => (
          <DraggableElement id="draggable-unassigned" model={model}>
            <DSButtonV2
              onClick={() => removeNode(model.dsId)}
              buttonType="icon"
            >
              <CloseMedium />
            </DSButtonV2>
            <DSButtonV2 onClick={() => {}} buttonType="icon">
              <MoreOptionsVert />
            </DSButtonV2>
          </DraggableElement>
        ))}
        <DSButtonV2
          onClick={() => addNewNode(currentNode)}
          buttonType="outline"
          width="100%"
        >
          <Add />
        </DSButtonV2>
      </Grid>
    </Grid>
  );
};
