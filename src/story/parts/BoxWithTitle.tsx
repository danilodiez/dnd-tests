import React, { ReactNode, useCallback, useState, useEffect } from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { styled } from "@elliemae/ds-system";
import { useItemsStore } from "../store";
import { UploadFile, AutoAction, MoreOptionsVert } from "@elliemae/ds-icons";
import { DSButtonV2 } from "@elliemae/ds-button";

const StyledBoxWrapper = styled(Grid)``;
type BoxWithTitleProps = {
  title: string;
  children: ReactNode;
  section: string;
};

// We could separate this BoxWithTitle in two different containers,
// one for Doc Folders and the other one for Unassigned,
// We just used BoxWithTitle because it accelerated the development

export const BoxWithTitle = React.memo(
  ({ title, children, section }: BoxWithTitleProps) => {
    const [itemsSelectedPerSection, setItemsSelectedPerSection] = useState([]);

    // store
    const selectedItems = useItemsStore((state) => state.selected);

    // Filtering with the section to count items separately within same Store
    useEffect(() => {
      const itemsPerSection = selectedItems?.filter(
        (item) => item.section === section
      );
      setItemsSelectedPerSection(itemsPerSection);
    }, [selectedItems]);

    return (
      <StyledBoxWrapper
        border="1px solid neutral-200"
        p="xxs"
        m="xxs"
        gutter="xxxs"
      >
        <Grid cols={["65%", "auto"]} alignItems={section === 'viewer' ? '' : "center"}> 
          <Grid cols={["auto"]}>
            <DSTypography variant="h4">
              {title}{" "}
              {section == "unassigned" &&
                `| ${itemsSelectedPerSection?.length}`}
            </DSTypography>
          </Grid>
          { section !== "viewer" ? 

          <Grid cols={["auto", "auto", "auto"]} justifyContent="flex-end">
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
        : null
          } 
        </Grid>
        <Grid>{children}</Grid>
      </StyledBoxWrapper>
    );
  }
);
