import { useState, useCallback } from "react";
import { useDSTree } from "@elliemae/ds-tree-model";
import { Grid } from "@elliemae/ds-grid";
import { DSButtonV2 } from "@elliemae/ds-button";
import {
  Add,
  ArrowShortReturn,
  ChevronSmallLeft,
  CloseMedium,
} from "@elliemae/ds-icons";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { DraggableElement } from "./DraggableElement";

const data = {
  dsId: "__root",
  label: "root",
  subitems: [
    {
      dsId: "1",
      label: "doc folder 1",
      subitems: [{ dsId: "2", label: "child 1.1" }],
    },
    {
      dsId: "3",
      label: "doc folder 2",
      subitems: [
        { dsId: "4", label: "child 2.1" },
        { dsId: "5", label: "child 2.2" },
      ],
    },
  ],
};

const options = {
  getUniqueId: (item) => item.dsId,
};

export const DocFoldersContainer = () => {
  const { addNode, getRoot, removeNode, getPath } = useDSTree(data, options);
  const [currentNode, setCurrentNode] = useState(getRoot());
  const [availableId, setAvailableId] = useState(0);

  const addNewNode = useCallback(
    (parent) => {
      const newLabel =
        parent === getRoot()
          ? `child ${parent.children.length + 10}`
          : `${parent.plainItem.label}.${parent.children.length + 10}`;
      addNode({ dsId: availableId.toString(), label: newLabel }, { parent });
      setAvailableId(availableId + 1);
    },
    [addNode, availableId, getRoot]
  );

  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-folders`,
  });
  const style = {
    border: isOver ? "2px solid green" : "2px solid red",
  };
  useDndMonitor({
    onDragEnd(e) {
      if (e.over.id === 'droppable-folders' && e.active.id.includes('draggable-unassigned')) {
        addNewNode(currentNode);
      }
    },
  });
  return (
    <Grid>
      <Grid gutter="xs" cols={["400px"]} ref={setNodeRef} style={style}>
        <DSButtonV2
          disabled={!currentNode.parent}
          onClick={() => setCurrentNode(currentNode.parent)}
          buttonType="icon"
        >
          <ChevronSmallLeft />
        </DSButtonV2>
        {currentNode.children.map((model) => (
          <DraggableElement id="draggable-folder" model={model}>
            <DSButtonV2
              onClick={() => removeNode(model.dsId)}
              buttonType="icon"
            >
              <CloseMedium />
            </DSButtonV2>
            <DSButtonV2
              disabled={!model.children.length}
              onClick={() => setCurrentNode(model)}
              buttonType="icon"
            >
              <ArrowShortReturn />
            </DSButtonV2>
            <DSButtonV2 onClick={() => addNewNode(model)} buttonType="icon">
              <Add />
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
