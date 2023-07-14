import React, { ReactNode, useCallback, useState, useEffect } from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { styled } from "@elliemae/ds-system";
import { useItemsStore } from "../store";
import { UploadFile, AutoAction, MoreOptionsVert } from "@elliemae/ds-icons";
import { DSButtonV2 } from "@elliemae/ds-button";
import { DSControlledCheckbox } from "@elliemae/ds-controlled-form";

const StyledBoxWrapper = styled(Grid)``;
type BoxWithTitleProps = {
  title: string;
  children: ReactNode;
  items: any[];
  section: string,
};
const rows = ["auto", "1fr"];
export const BoxWithTitle = React.memo(
  ({ title, items, children, section }: BoxWithTitleProps) => {
    const [mixedState, setMixedState] = useState(false);
    const [itemsSelectedPerSection, setItemsSelectedPerSection] = useState([])

    const idsStrings = React.useMemo(
      () => items?.map((node) => node.dsId).join(" ") || "",
      [items]
    );
    // store
    const selectedItems = useItemsStore((state) => state.selected);
    const setItems = useItemsStore((state) => state.setItems);

    useEffect(() => {
      const itemsPerSection = selectedItems?.filter(item => item.section === section);
      setItemsSelectedPerSection(itemsPerSection);
    }, [selectedItems])
    
    // TODO: this is not working yet
    const handleSelection = useCallback(() => {
      return
      // if (selectedItems.length) {
      //   setItems([], "");
      //   setMixedState(false);
      // } else {
      //   setItems(items, "");
      //   setMixedState(true);
      // }
    }, [selectedItems]);

    useEffect(() => {
      if (
        selectedItems?.length > 0 &&
        selectedItems?.length !== items?.length
      ) {
        setMixedState("mixed");
      } else {
        setMixedState(false);
      }
    }, [selectedItems]);

    return (
      <StyledBoxWrapper
        border="1px solid neutral-600"
        p="xxs"
        m="xxs"
        gutter="xxxs"
      >
        <Grid cols={["65%", "auto"]}>
          <Grid cols={["20px", "auto"]}>
            <DSControlledCheckbox
              data-testid="custom-data-testid"
              checked={mixedState}
              id="id1"
              aria-controls={idsStrings}
              onChange={handleSelection}
              device="desktop"
            />
            <DSTypography variant="h4">
              {title} | {itemsSelectedPerSection?.length}
            </DSTypography>
          </Grid>
          <Grid
            cols={["auto", "auto", "auto"]}
            justifyContent="flex-end"
          >
            <DSButtonV2 buttonType="icon" aria-label="Upload">
              <UploadFile />
            </DSButtonV2>
            <DSButtonV2 buttonType="icon" aria-label="AutoAction">
              <AutoAction />
            </DSButtonV2>
            <DSButtonV2 buttonType="icon" aria-label="More Options">
              <MoreOptionsVert />
            </DSButtonV2>
          </Grid>
        </Grid>
        <Grid>{children}</Grid>
      </StyledBoxWrapper>
    );
  }
);
