import React, {ReactNode} from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { styled } from "@elliemae/ds-system";
import { useDroppable, useDndMonitor, useDraggable } from "@dnd-kit/core";

const StyledBoxWrapper = styled(Grid)``;
type BoxWithTitleProps = {
  title: string;
  children: ReactNode;
}
const rows = ["auto", "1fr"];
export const BoxWithTitle = React.memo(({ title, children }: BoxWithTitleProps) => {
  return (
    <StyledBoxWrapper
      border="2px solid neutral-600"
      borderRadius="xxs"
      p="xxs"
      m="xxs"
      gutter="xs"
    >
      <Grid>
        <DSTypography variant="h4">{title}</DSTypography>
      </Grid>
      <Grid>{children}</Grid>
    </StyledBoxWrapper>
  );
});
