import React, { useState } from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { DSDropdownMenuV2 } from "@elliemae/ds-dropdownmenu";
import {
  Folder,
  FolderRoot,
  MoreOptionsVert,
  UploadFile,
  FileJpeg,
  FilePdf,
} from "@elliemae/ds-icons";
import { DSButtonV2 } from "@elliemae/ds-button";
import { DraggableElement } from "../DraggableElement";

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
  "auto", // if we need RightAddons
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
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const handleDropdown = () => {
      setDropdownOpened((prev) => !prev);
    };
    return (
      <Grid>
        <Grid cols={cols} alignItems="center">
          <Grid>
            <DSButtonV2
              buttonType="icon"
              aria-label="Button just need an aria label"
              onClick={() => setShowFiles((prev) => !prev)}
            >
              {showFiles && node.children.length ? (
                <FolderRoot size="s" />
              ) : (
                <Folder size="s" />
              )}
            </DSButtonV2>
          </Grid>
          <Grid
            cols={["1fr"]}
            alignItems="center"
            justifyContent="space-between"
          >
            <DSTypography variant="b1" truncateWithEllipsis>
              {item.originalNodeData.name}
            </DSTypography>
          </Grid>
          <Grid cols={["auto", "auto"]} justifyContent="flex-end">
            <DSButtonV2 buttonType="icon" aria-label="Upload">
              <UploadFile />
            </DSButtonV2>
            <DSDropdownMenuV2
              data-testid="custom-data-test-id"
              isOpened={dropdownOpened}
              options={[
                {
                  dsId: "id0",
                  type: "section",
                  label: "Folder options",
                },
              ]}
              onClickOutside={() => {
                setDropdownOpened(false);
              }}
              minWidth={300}
            >
              <DSButtonV2
                buttonType="icon"
                aria-label="Toolbar"
                onClick={handleDropdown}
              >
                <MoreOptionsVert />
              </DSButtonV2>
            </DSDropdownMenuV2>
          </Grid>
        </Grid>

        {showFiles &&
          node.children.map((childItem) => (
            <DraggableElement
              model={childItem.plainItem}
              node={childItem}
              ownerTree={startingTree}
              key={childItem.plainItem.id}
              section="attachment"
            >
              <FileItem item={childItem.plainItem} shouldRenderTooltip />
            </DraggableElement>
          ))}
      </Grid>
    );
  }
);

export const FileItem = React.memo(
  ({ item, shouldRenderTooltip }: FileItemProps) => {
    const cols = React.useMemo(() => getCols(1), [item.depth]);
    return (
      <Grid cols={cols} alignItems="center">
        <Grid />
        <Grid mr="xxs">
          {item.originalNodeData.id % 2 === 0 ? <FilePdf /> : <FileJpeg />}
        </Grid>
        <Grid>
          <DSTypography variant="b1">
            {" "}
            {item.originalNodeData.name}
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
