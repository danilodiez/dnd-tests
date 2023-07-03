import React from 'react';
import { styled } from '@elliemae/ds-system';
import { Grid } from '@elliemae/ds-grid';
import { useOnBlurOut } from '@elliemae/ds-utilities';
import { useFocusTracker } from '../config/useFocusTracker';
import { CUSTOM_TREE_SLOTS, CUSTOM_TREE_DATA_TESTID } from '../constants';

const StyledWrapper = styled(Grid, {
  name: 'ds-custom-tree',
  slot: CUSTOM_TREE_SLOTS.WRAPPER,
})``;
const mainContentCols = ['1fr'];

export const MainContent = React.memo(() => {
  const { trackFocusRegionReset } = useFocusTracker();
  const config = React.useMemo(
    () => ({
      onBlur: () => {
        trackFocusRegionReset();
      },
    }),
    [trackFocusRegionReset]
  );
  const handleOnBlurOut = useOnBlurOut(config);
  return (
    <StyledWrapper
      cols={mainContentCols}
      onBlur={handleOnBlurOut}
      data-testid={CUSTOM_TREE_DATA_TESTID.WRAPPER}
    >
      Hello world! I am DSCustomTree
    </StyledWrapper>
  );
});
