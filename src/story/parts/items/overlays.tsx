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
  top: ${({ $offset }) => $offset}px;
  left: ${({ $offset }) => $offset}px;
`;

export const StackOfCards = ({ items, children }) => {
  return (
    <StyledStackBorderWrapper
      borderRadius="xxs"
      border="1px solid black"
      width="80%"
      bg="white"
    >
      <StyledStackBorderHelper
        borderRadius="xxs"
        border="1px solid brand-700"
        bg="brand-300"
        $offset="-5"
      />
      <StyledStackBorderHelper
        borderRadius="xxs"
        border="1px solid brand-700"
        bg="brand-400"
        $offset="-3"
      />
      <Grid
        cols={["36px", "1fr"]}
        border="1px solid neutral-100"
        alignItems="center"
        bg="white"
      >
        <DSButtonV2 buttonType="icon" aria-label="Drag and Drop Handler">
            <NotificationBadge size="s" type="number" value={items?.length} />
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
      width="80%"
      border="1px solid neutral-100"
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
