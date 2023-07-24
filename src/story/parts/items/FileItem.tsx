import React from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { MoreOptionsVert, FileJpeg, FilePdf } from "@elliemae/ds-icons";
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

const getCols = () => ["auto", "1fr", "auto"];

export const FileItem = React.memo(
  ({ item, shouldRenderTooltip }: FileItemProps) => {
    const cols = React.useMemo(() => getCols(), [item.depth]);
    return (
      <Grid cols={cols} alignItems="center">
        <Grid mr="xxs">
          {/* We should replace the line below with utils to detect the extension and render the icon*/}
          {item.originalNodeData.id % 2 === 0 ? <FilePdf /> : <FileJpeg />}
        </Grid>
        <Grid>
          <DSTypography variant="b1">
            {item.originalNodeData.name}
            {/* Same here */}
            {item.originalNodeData.id % 2 === 0 ? ".pdf" : ".jpeg"}
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
