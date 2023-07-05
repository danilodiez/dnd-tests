import React, { useState } from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { File, Folder, ChevronDown, ChevronRight } from "@elliemae/ds-icons";
import { styled } from "@elliemae/ds-system";
import { DSButtonV2 } from "@elliemae/ds-button";
import { DraggableElement } from "../DraggableElement";
import { useDroppable, useDndMonitor, useDraggable } from "@dnd-kit/core";

type FlatNode = {
  id: string;
  originalNodeData: {
    id: number;
    name: string;
    isGroup: boolean;
  };
  depth: number;
};
type FlatNodes = FlatNode[];

// based on the item depth we add some padding to the left,
//  we then leave "auto" space for the icon
//   and fill the rest with the content of the item
//  (if in the future we need RightAddons, this is where we would add them, by adding "auto" at the end)
const getCols = (treeDepth: number) => [
  `${treeDepth * 8}px`,
  "auto",
  "auto",
  "1fr",
  // "auto", // if we need RightAddons
];

interface ItemProps {
  item: FlatNode;
  node: any;
  startingTree: any;
}

export const FolderItem = React.memo(
  ({ item, node, startingTree }: ItemProps) => {
    const { isOver, setNodeRef } = useDroppable({
      id: `droppable-folder-${item.id}`,
      data: { node, ownerTree: startingTree },
    });
    const style = {
      border: isOver ? "1px solid green" : "1px solid black",
    };
    // each useDndMonitor should handle it's own behavior
    useDndMonitor({
      onDragEnd(e) {
        const startingTree = e.active.data.current.ownerTree;
        const grabbedNode = e.active.data.current.node;
        const destinationTree = e.over.data.current.ownerTree;
        // If the drop area is a folder, we must send the node, if not
        // we use the whole tree meaning unassigned
        const parentNode = e.over.data.current.node ? e.over.data.current.node : destinationTree.getRoot();

        const droppableSecondWord = e.over.id.split("-")[1];
        const draggableSecondWord = e.active.id.split("-")[1];

        // Here we want to handle from unassigned to a folder
        if (
          droppableSecondWord === "folder" &&
          draggableSecondWord === "unassigned"
        ) {

          destinationTree.addNode(grabbedNode.plainItem, { parent: parentNode });
          startingTree.removeNode(grabbedNode.dsId);
        }
      },
    });

    const cols = React.useMemo(() => getCols(item.depth * 2), [item.depth]);
    const [showFiles, setShowFiles] = useState(true);
    return (
      <Grid aria-label="folder-container" ref={setNodeRef} style={style}>
        <Grid cols={cols} alignItems="center">
          <Grid>
            <Folder />
          </Grid>
          <Grid>
            <DSButtonV2
              buttonType="icon"
              aria-label="Button just need an aria label"
              onClick={() => setShowFiles((prev) => !prev)}
            >
              {showFiles ? <ChevronDown size="s" /> : <ChevronRight size="s" />}
            </DSButtonV2>
          </Grid>
          <Grid>
            <DSTypography variant="b1">
              {item.originalNodeData.name}
            </DSTypography>
          </Grid>
        </Grid>
        {showFiles &&
          node.children.map((childItem) => (
            <DraggableElement
              dragPrefix="attachment"
              model={childItem.plainItem}
              node={childItem}
              ownerTree={startingTree}
            >
              <FileItem
                key={childItem.plainItem.id}
                item={childItem.plainItem}
              />
            </DraggableElement>
          ))}
      </Grid>
    );
  }
);

export const FileItem = React.memo(({ item }: ItemProps) => {
  const cols = React.useMemo(() => getCols(1), [item.depth]);
  return (
    <Grid cols={cols}>
      <Grid />
      <Grid mr="xxs">
        <File />
      </Grid>
      <Grid>
        <DSTypography variant="b1">
          {" "}
          {item.originalNodeData.name}
        </DSTypography>
      </Grid>
      {/* <Grid> if you need RightAddons
        <RightAddons>
      </Grid> */}
    </Grid>
  );
});
