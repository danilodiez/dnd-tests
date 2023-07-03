/* eslint-disable complexity */
import { useMemo } from 'react';
import { useMakeMutable } from '@elliemae/ds-utilities';
import { useInternalStore } from './store';
import { CUSTOM_TREE_REGION_FOCUSES } from '../constants';

export const useFocusTracker = () => {
  const focusRegion = useInternalStore((state) => state.focusRegion);
  //  tracking actions are always triggered as user action callbacks
  //    this means it should always be invoked after all the useEffect execute
  //    since this is the case, we can avoid re-declaring the function with mutable pattern
  //    this way we avoid useless re-renders
  const mutableFocusRegion = useMakeMutable(focusRegion);
  const setFocusRegion = useInternalStore((state) => state.setFocusRegion);

  return useMemo(
    () => ({
      mutableFocusRegion,
      trackFocusRegionReset: () =>
        setFocusRegion(CUSTOM_TREE_REGION_FOCUSES.RESET),
    }),
    [mutableFocusRegion, setFocusRegion]
  );
};
