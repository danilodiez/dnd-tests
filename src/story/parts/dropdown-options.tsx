import React from "react";
import {
  InfoCircle,
  EditPencil,
  Documents,
  Delete,
  MoveToFolder,
  ViewContract,
} from "@elliemae/ds-icons";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { useDialogStore } from "../store";
import { NotificationBadge } from "@elliemae/ds-notification-badge";

export const mockDropdownMenuOptions = (items) => [
  {
    dsId: "id0",
    type: "section",
    label: "Folder Actions",
  },
  {
    dsId: "id1",
    type: "single",
    render: ({}) => (
      <Grid cols={["12px", "auto"]} rows={["1fr"]} gutter="xs">
        <InfoCircle color={["brand-primary", "600"]} />
        <DSTypography variant="b2" as="section">
          Folder Details
        </DSTypography>
      </Grid>
    ),
  },
  {
    dsId: "id2",
    type: "single",
    render: ({}) => (
      <Grid cols={["12px", "auto"]} rows={["1fr"]} gutter="xs">
        <EditPencil color={["brand-primary", "600"]} />
        <DSTypography variant="b2" as="section">
          Rename Folder
        </DSTypography>
      </Grid>
    ),
  },
  {
    dsId: "id3",
    type: "single",
    render: ({}) => (
      <Grid cols={["12px", "auto"]} rows={["1fr"]} gutter="xs">
        <Documents color={["brand-primary", "600"]} />
        <DSTypography variant="b2" as="section">
          Duplicate
        </DSTypography>
      </Grid>
    ),
  },
  {
    dsId: "id4",
    type: "single",
    render: ({}) => (
      <Grid cols={["12px", "auto"]} rows={["1fr"]} gutter="xs">
        <Delete color={["brand-primary", "600"]} />
        <DSTypography variant="b2" as="section">
          Delete Folder
        </DSTypography>
      </Grid>
    ),
  },
  {
    dsId: "idx",
    type: "section",
    label: "Bulk Actions",
    render: () => {
      return (
        <>
          <NotificationBadge size="s" value={items.length} color="#016BA9" /> 
          <DSTypography variant="b1" color="neutral-500" ml="4px">
            Bulk Actions
          </DSTypography>
        </>
      );
    },
  },
  {
    dsId: "id5",
    type: "single",
    disabled: (!items?.length),
    render: ({}) => {
      const isOpen = useDialogStore((state) => state.isOpen);
      const toggleDialog = useDialogStore((state) => state.toggleDialog);
      return (
        <Grid
          cols={["12px", "auto"]}
          rows={["1fr"]}
          gutter="xs"
          onClick={() => toggleDialog(!isOpen)}
        >
          <MoveToFolder color={["brand-primary", "600"]} />
          <DSTypography variant="b2" as="section">
            Move to
          </DSTypography>
        </Grid>
      );
    },
  },
  {
    dsId: "id7",
    type: "single",
    disabled: (!items?.length),
    render: ({}) => (
      <Grid cols={["12px", "auto"]} rows={["1fr"]} gutter="xs">
        <ViewContract color={["brand-primary", "600"]} />
        <DSTypography variant="b2" as="section">
          Merge Files
        </DSTypography>
      </Grid>
    ),
  },
  {
    dsId: "id8",
    type: "single",
    disabled: (!items?.length),
    render: ({}) => {

      const toggleConfirmationDialog= useDialogStore((state) => state.toggleConfirmationDialog);
      return(
      <Grid cols={["12px", "auto"]} rows={["1fr"]} gutter="xs" onClick={toggleConfirmationDialog}>
        <Delete color={["brand-primary", "600"]} />
        <DSTypography variant="b2" as="section">
          Delete Files
        </DSTypography>
      </Grid>
    )}
  },
];
