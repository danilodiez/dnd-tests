import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Grid } from "@elliemae/ds-grid";
import { styled } from "@elliemae/ds-system";

const StyledWithDropIndicator = styled(Grid)`
  ${(props) => {
    const dataId = props["data-id"];
    return `
   border-width: var(--hover-item-${dataId}-border-width);
   border-style: var(--hover-item-${dataId}-border-style);
   border-color: var(--hover-item-${dataId}-border-color);
  `;
  }}
`;

export const DroppableContainer = ({ id, data, children }) => {
  const { setNodeRef } = useDroppable({
    id: `${id}`,
    data,
  });

  return (
    <StyledWithDropIndicator data-id={id}>
      <Grid ref={setNodeRef}>
        {children}
      </Grid>
    </StyledWithDropIndicator>
  );
};
