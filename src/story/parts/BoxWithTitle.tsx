import React from "react";
import { Grid } from "@elliemae/ds-grid";
import { DSTypography } from "@elliemae/ds-typography";
import { File, Folder } from "@elliemae/ds-icons";
import { styled } from "@elliemae/ds-system";

const StyledBoxWrapper = styled(Grid)``;

const rows = ["auto", "1fr"];
export const BoxWithTitle = React.memo(({ title, children }) => (
  <StyledBoxWrapper
    border="4px solid neutral-600"
    borderRadius="xxs"
    p="xxs"
    m="xxs"
    gutter="s"
  >
    <Grid>
      <DSTypography variant="h4">{title}</DSTypography>
    </Grid>
    <Grid>{children}</Grid>
  </StyledBoxWrapper>
));
