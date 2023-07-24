/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines */
import { useState, useCallback, useRef, useMemo } from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSButtonV2, BUTTON_TYPES } from "@elliemae/ds-button";
import { DSComboBox } from "@elliemae/ds-controlled-form";
import { Close } from "@elliemae/ds-icons";
import { useFocusTrap } from "@elliemae/ds-utilities";
import {
  DSDialog,
  DSDialogHeader,
  DSDialogBody,
  DSDialogFooter,
  DSDialogSeparator,
  DSDialogTitle,
  DSDialogAddon,
} from "@elliemae/ds-dialog";
import { useDialogStore } from "../store";

// eFolder component, copy and paste except for the Redux use
export const MoveToFolderDialog = () => {
  const firstElementRef = useRef(null);
  const lastElementRef = useRef(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [currentOptions, setCurrentOptions] = useState(null);

  const toggleDialog = useDialogStore((state) => state.toggleDialog);
  const isDialogOpen = useDialogStore((state) => state.isOpen);
  const handleOnKeyDown = useFocusTrap({ firstElementRef, lastElementRef });

  const documentFoldersNames = [
    {
      dsId: "0",
      type: "option",
      label: "*Arm Disclosure",
      value: "fad25606-3fe3-4abf-9b17-548aa6dd0099",
    },
    {
      dsId: "1",
      type: "option",
      label: "*Closing Disclosure",
      value: "fad25606-3fe3-4abf-9b17",
    },
    {
      dsId: "2",
      type: "option",
      label: "*CustomFormeSign",
      value: "1123d-3fe3-4abf-9b17-548aa6dd0099",
    },
    {
      dsId: "3",
      type: "option",
      label: "*Loan Estimate",
      value: "3fe3-4abf-9b17-548aa6dd0099",
    },
    {
      dsId: "4",
      type: "option",
      label: "*Loan Submission",
      value: "4abf-9b17-548aa6dd0099",
    },
  ];


  const handleOnChange = useCallback(
    (option) => {
      setSelectedFolder(option);
      setCurrentOptions(documentFoldersNames);
    },
    [documentFoldersNames]
  );

  const onCancelClick = useCallback(() => {
    toggleDialog(false);
    setSelectedFolder(null);
  }, []);

  const handleOnFilter = useCallback((newItems) => {
    setCurrentOptions(newItems);
  }, []);

  return (
    <div>
      <Grid justifyContent="center" alignItems="center" height="100%">
        <DSDialog
          isOpen={isDialogOpen}
          onClickOutside={onCancelClick}
          onClose={onCancelClick}
          onKeyDown={handleOnKeyDown}
          width="300px"
        >
          <DSDialogHeader>
            <DSDialogTitle>Move to...</DSDialogTitle>
            <DSDialogAddon>
              <DSButtonV2
                buttonType={BUTTON_TYPES.ICON}
                data-testid="close-dialog-button"
                onClick={onCancelClick}
                aria-label="Close Dialog"
                innerRef={firstElementRef}
              >
                <Close color={["neutral", "900"]} title="Close" />
              </DSButtonV2>
            </DSDialogAddon>
          </DSDialogHeader>
          <DSDialogSeparator />
          <DSDialogBody p={0}>
            <Grid minWidth={250} height={350}>
              <DSComboBox
                autoFocus
                inline
                placeholder="Search"
                filteredOptions={currentOptions}
                onChange={handleOnChange}
                allOptions={documentFoldersNames}
                selectedValues={selectedFolder}
                onFilter={handleOnFilter}
              />
            </Grid>
          </DSDialogBody>
          <DSDialogSeparator />
          <DSDialogFooter>
            <DSButtonV2
              innerRef={!selectedFolder ? lastElementRef : null}
              buttonType={BUTTON_TYPES.OUTLINE}
              onClick={onCancelClick}
              aria-label="Cancel"
            >
              Cancel
            </DSButtonV2>
            <DSButtonV2
              innerRef={selectedFolder ? lastElementRef : null}
              onClick={() => {}}
              disabled={!selectedFolder}
              aria-label={"Apply"}
            >
              Apply
            </DSButtonV2>
          </DSDialogFooter>
        </DSDialog>
      </Grid>
    </div>
  );
};
