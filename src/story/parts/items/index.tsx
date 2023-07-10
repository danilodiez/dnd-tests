import React, { useState } from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { File, Folder, FolderRoot } from "@elliemae/ds-icons";
import { styled } from "@elliemae/ds-system";
import { DSButtonV2 } from "@elliemae/ds-button";
import { useDroppable, useDndMonitor, useDraggable } from "@dnd-kit/core";
import { DraggableElement } from "../DraggableElement";
import { FolderClose, FolderOpen } from "./foldersSvgs";
import { DroppableContainer } from "../DroppableContainer";
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
  // `${treeDepth * 8}px`,
  "auto",
  "auto",
  "1fr",
  // "auto", // if we need RightAddons
];

type FolderProps = {
  item: FlatNode;
  node: any;
  startingTree: any;
};
type FileItemProps = {
  item: FlatNode;
};

export const FolderItem = React.memo(
  ({ item, node, startingTree }: FolderProps) => {
    const cols = React.useMemo(() => getCols(item.depth), [item.depth]);
    const [showFiles, setShowFiles] = useState(true);
    return (
      <Grid>
        <Grid cols={cols} alignItems="center">
          <Grid>
            <DSButtonV2
              buttonType="icon"
              aria-label="Button just need an aria label"
              onClick={() => setShowFiles((prev) => !prev)}
            >
              {showFiles ? <FolderRoot size="s" /> : <Folder size="s" />}
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
              model={childItem.plainItem}
              node={childItem}
              ownerTree={startingTree}
              key={childItem.plainItem.id}
            >
              <FileItem item={childItem.plainItem} />
            </DraggableElement>
          ))}
      </Grid>
    );
  }
);

export const FileItem = React.memo(({ item }: FileItemProps) => {
  const cols = React.useMemo(() => getCols(1), [item.depth]);
  return (
    <Grid cols={cols}>
      <Grid />
      <Grid mr="xxs">
        <File />
      </Grid>
      <Grid>
        <DSTypography variant="b1"> {item.originalNodeData.name}</DSTypography>
      </Grid>
      {/* <Grid> if you need RightAddons
        <RightAddons>
      </Grid> */}
    </Grid>
  );
});
