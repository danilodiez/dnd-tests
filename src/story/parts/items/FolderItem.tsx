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
import { FileItem } from "./FileItem";
import { useItemsStore } from "../../store";
import { useDialogStore } from "../../store";
import { mockDropdownMenuOptions } from "../dropdown-options";
import { ConfirmationModal } from "../ConfirmationModal";

type FlatNode = {
  id: string;
  originalNodeData: {
    id: number;
    name: string;
    isGroup: boolean;
  };
  depth: number;
};

const getCols = () => [
  "auto",
  "auto",
  "1fr",
  "auto", 
];

type FolderProps = {
  item: FlatNode;
  node: any;
  startingTree: any;
  items: any;
};

export const FolderItem = React.memo(
  ({ item, node, startingTree, items }: FolderProps) => {
    const cols = React.useMemo(() => getCols(), [item.depth]);

    const [showFiles, setShowFiles] = useState(true);
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [mixedState, setMixedState] = useState(false);
    const [itemsSelectedPerSection, setItemsSelectedPerSection] = useState([]);

    const selectedItems = useItemsStore((state) => state.selected);
    const setItems = useItemsStore((state) => state.setItems);
    const resetStore = useItemsStore((state) => state.resetStore);
    const isDialogOpen = useDialogStore((state) => state.isOpen);
    const isConfirmationOpen = useDialogStore((state) => state.isConfirmationOpen);
    const toggleConfirmationDialog= useDialogStore((state) => state.toggleConfirmationDialog);

    const handleDropdown = () => {
      setDropdownOpened((prev) => !prev);
    };
    // We set the counter using a filter with the section, so we could use the same state,
    // This won't be the same on eFolder as we handle store differently
    useEffect(() => {
      const currentSection = `folder-${node.dsId}`;
      const itemsPerSection = selectedItems?.filter(
        (item) => item.section === currentSection
      );
      setItemsSelectedPerSection(itemsPerSection);
    }, [selectedItems]);

    useEffect(() => {
      setDropdownOpened(false);
    }, [isDialogOpen, isConfirmationOpen]);

    // This won't be used unless we want to handle mixed states,
    // But this is the logic to handle that
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

    const options = React.useMemo(
      () => mockDropdownMenuOptions(itemsSelectedPerSection),
      [itemsSelectedPerSection]
    );
    return (
      <>
        <Grid>
          <Grid cols={cols} alignItems="center">
            <Grid cols={["auto", "auto"]} alignItems="center" mr="8px">
              <DSButtonV2
                buttonType="icon"
                aria-label="Button just need an aria label"
                onClick={() => setShowFiles((prev) => !prev)}
              >
                {/* We handle the Chevron and Folder expand */}
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
                options={options}
                onClickOutside={() => {
                  setDropdownOpened(false);
                }}
                minWidth={250}
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

        {/* We are trying to demostrate that we could use same components as on eFolder with low effort */}
        <ConfirmationModal
          open={isConfirmationOpen}
          toggleDialog={toggleConfirmationDialog}
          onConfirmation={()=>{}}
          title={`Delete File${
            Object.keys(selectedItems).length > 1 ? "s" : ""
          }`}
          body={`Are you sure you want to delete the file${
            Object.keys(selectedItems).length > 1 ? "s" : ""
          }?`}
          type="warning"
        />
      </>
    );
  }
);
