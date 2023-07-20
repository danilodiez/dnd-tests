import React from "react";
import { Grid } from "@elliemae/ds-grid";
import { styled } from "@elliemae/ds-system";
import { DSButtonV2 } from "@elliemae/ds-button";
import { NotificationBadge } from "@elliemae/ds-notification-badge";
import { GripperVertical } from "@elliemae/ds-icons";

const StyledStackBorderWrapper = styled(Grid)`
  position: relative;
`;
const StyledStackBorderHelper = styled(Grid)`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${({ $offset }) => $offset};
  bottom: ${({ $offset }) => $offset}px;
  right: ${({ $offset }) => $offset}px;
`;

export const StackOfCards = ({ items, children }) => {
  return (
    <StyledStackBorderWrapper
      border="2px solid brand-600"
      width="50%"
      bg="white"
    >
      <StyledStackBorderHelper
        border="1px solid neutral-100"
        bg="neutral-400"
        $offset="-7"
      />
      <StyledStackBorderHelper
        border="1px solid neutral-100"
        bg="neutral-400"
        $offset="-5"
      />
      <Grid
        cols={["36px", "1fr"]}
        border="1px solid neutral-100"
        alignItems="center"
        bg="white"
      >
        <DSButtonV2 buttonType="icon" aria-label="Drag and Drop Handler">
            <NotificationBadge color="#016BA9" size="s" type="number" value={items?.length} />
        </DSButtonV2>
        {children}
      </Grid>
    </StyledStackBorderWrapper>
  );
};

export const SingleOverlay = ({style, children}) => {
  return (
    <Grid
      cols={["36px", "1fr"]}
      width="50%"
      border="2px solid brand-600"
      alignItems="center"
      bg="white"
      style={style}
    >
      <DSButtonV2 buttonType="icon" aria-label="Drag and Drop Handler">
        <GripperVertical />
      </DSButtonV2>
      {children}
    </Grid>
  );
};
