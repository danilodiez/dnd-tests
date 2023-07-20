import React from 'react';

import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import {
  MoreOptionsVert,
  FileJpeg,
  FilePdf,
} from "@elliemae/ds-icons";
import { DSButtonV2 } from "@elliemae/ds-button";

type FileItemProps = {
  item: FlatNode;
  shouldRenderTooltip: boolean;
};

type FlatNode = {
  id: string;
  originalNodeData: {
    id: number;
    name: string;
    isGroup: boolean;
  };
  depth: number;
};

const getCols = (treeDepth: number) => [
  // `${treeDepth * 8}px`,
  "auto",
  "auto",
  "1fr",
  "auto", // if we need RightAddons
];

export const FileItem = React.memo(
  ({ item, shouldRenderTooltip }: FileItemProps) => {
    const cols = React.useMemo(() => getCols(1), [item.depth]);
    return (
      <Grid cols={cols} alignItems="center">
        <Grid mr="xxs">
          {item.originalNodeData.id % 2 === 0 ? <FilePdf /> : <FileJpeg />}
        </Grid>
        <Grid>
          <DSTypography variant="b1">
            {" "}
            {item.originalNodeData.name}
          {item.originalNodeData.id % 2 === 0 ? '.pdf' : '.jpeg'}
          </DSTypography>
        </Grid>
        {shouldRenderTooltip && (
          <Grid>
            <DSButtonV2 buttonType="icon" aria-label="Toolbar">
              <MoreOptionsVert />
            </DSButtonV2>
          </Grid>
        )}
      </Grid>
    );
  }
);
