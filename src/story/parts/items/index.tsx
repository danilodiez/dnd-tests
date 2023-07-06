import React, { useState } from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { File, Folder, ChevronDown, ChevronRight } from "@elliemae/ds-icons";
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

    const cols = React.useMemo(() => getCols(item.depth * 2), [item.depth]);
    const [showFiles, setShowFiles] = useState(true);
    return (
      <Grid >
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
        <DSTypography variant="b1"> {item.originalNodeData.name}</DSTypography>
      </Grid>
      {/* <Grid> if you need RightAddons
        <RightAddons>
      </Grid> */}
    </Grid>
  );
});
