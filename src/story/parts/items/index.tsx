import React from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { File, Folder } from "@elliemae/ds-icons";
import { styled } from "@elliemae/ds-system";

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
  "1fr",
  // "auto", // if we need RightAddons
];

interface ItemProps {
  item: FlatNode;
}

export const FolderItem = React.memo(({ item }: ItemProps) => {
  const cols = React.useMemo(() => getCols(item.depth), [item.depth]);
  return (
    <Grid cols={cols}>
      <Grid />
      <Grid mr="xxs">
        <Folder />
      </Grid>
      <Grid>
        <DSTypography variant="b1">{item.originalNodeData.name}</DSTypography>
      </Grid>
    </Grid>
  );
});

export const FileItem = React.memo(({ item }: ItemProps) => {
  const cols = React.useMemo(() => getCols(item.depth), [item.depth]);
  return (
    <Grid cols={cols}>
      <Grid />
      <Grid mr="xxs">
        <File />
      </Grid>
      <Grid>
        <DSTypography variant="b1">{item.originalNodeData.name}</DSTypography>
      </Grid>
      {/* <Grid> if you need RightAddons
        <RightAddons>
      </Grid> */}
    </Grid>
  );
});
