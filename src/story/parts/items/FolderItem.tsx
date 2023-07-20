import React, { useState, useEffect } from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { DSDropdownMenuV2 } from "@elliemae/ds-dropdownmenu";
import {
  Folder,
  MoreOptionsVert,
  UploadFile,
  ArrowheadDown,
  ArrowheadRight,
} from "@elliemae/ds-icons";
import { DSButtonV2 } from "@elliemae/ds-button";
import { DraggableElement } from "../DraggableElement";
import { DSControlledCheckbox } from "@elliemae/ds-controlled-form";
import { FileItem } from "./FileItem";
import { useItemsStore } from "../../store";

type FlatNode = {
  id: string;
  originalNodeData: {
    id: number;
    name: string;
    isGroup: boolean;
  };
  depth: number;
};

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
  items: any;
};

export const FolderItem = React.memo(
  ({ item, node, startingTree, items }: FolderProps) => {
    const cols = React.useMemo(() => getCols(item.depth), [item.depth]);
    const [showFiles, setShowFiles] = useState(true);
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [mixedState, setMixedState] = useState(false);
    const [itemsSelectedPerSection, setItemsSelectedPerSection] = useState([]);

    const selectedItems = useItemsStore((state) => state.selected);
    const setItems = useItemsStore((state) => state.setItems);
    const resetStore = useItemsStore((state) => state.resetStore);

    const idsStrings = React.useMemo(
      () => items?.map((node) => node.dsId).join(" ") || "",
      [items]
    );
    const handleDropdown = () => {
      setDropdownOpened((prev) => !prev);
    };
    useEffect(() => {
      const currentSection = `folder-${node.dsId}`;
      const itemsPerSection = selectedItems?.filter(
        (item) => item.section === currentSection
      );
      setItemsSelectedPerSection(itemsPerSection);
    }, [selectedItems]);

    const handleSelection = React.useCallback(() => {
      if (itemsSelectedPerSection.length) {
        resetStore();
        setMixedState(false);
      } else {
        const section = `folder-${node.dsId}`;
        node.children.forEach((node) => setItems({ node, section }));
        setMixedState(true);
      }
    }, [itemsSelectedPerSection]);

    return (
      <Grid>
        <Grid cols={cols} alignItems="center">
          <Grid cols={['auto', 'auto']} alignItems="center" mr="8px">
            <DSButtonV2
              buttonType="icon"
              aria-label="Button just need an aria label"
              onClick={() => setShowFiles((prev) => !prev)}
            >
              {showFiles && node.children.length ? (
                <ArrowheadDown size="s" />
              ) : (
                <ArrowheadRight size="s" />
              )}
            </DSButtonV2>
            <Folder size="s" color={["brand-primary", "600"]} />
          </Grid>
          <Grid
            cols={["1fr"]}
            alignItems="center"
            justifyContent="space-between"
          >
            <DSTypography variant="b1" truncateWithEllipsis>
              {item.originalNodeData.name} | {itemsSelectedPerSection.length}
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

        {showFiles
          ? node.children.map((childItem) => (
              <Grid ml="4px">
                <DraggableElement
                  model={childItem.plainItem}
                  node={childItem}
                  ownerTree={startingTree}
                  key={childItem.plainItem.id}
                  section={`folder-${node.dsId}`}
                >
                  <FileItem item={childItem.plainItem} shouldRenderTooltip />
                </DraggableElement>
              </Grid>
            ))
          : null}
      </Grid>
    );
  }
);
