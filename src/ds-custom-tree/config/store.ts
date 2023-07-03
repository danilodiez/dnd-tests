import { createInternalAndPropsContext, type ZustandT } from '@elliemae/ds-zustand-helpers';
import { type DSCustomTreeT, defaultProps } from '../react-desc-prop-types';
import { CUSTOM_TREE_REGION_FOCUSES } from '../constants';
import { useAutoCalculated } from './useAutoCalculated';

const internalAtomDefaultValues: DSCustomTreeT.InternalAtoms = {
  focusRegion: CUSTOM_TREE_REGION_FOCUSES.RESET,
  exampleState: '0',
};

const selectors: ZustandT.SelectorObject<DSCustomTreeT.InternalStore, DSCustomTreeT.Selectors> = (get) => ({
  getExampleStateIsZero: () => get()?.exampleState === '0',
});

const reducers: ZustandT.ReducerObject<DSCustomTreeT.InternalStore, DSCustomTreeT.Reducers> = () => ({});

export const { PropsProvider, usePropsStore, InternalProvider, useInternalStore } = createInternalAndPropsContext<
  DSCustomTreeT.InternalProps,
  DSCustomTreeT.InternalAtoms,
  DSCustomTreeT.UseAutoCalculatedT,
  DSCustomTreeT.Selectors,
  DSCustomTreeT.Reducers
>();

export const config = {
  defaultProps: defaultProps as DSCustomTreeT.InternalProps,
  internalAtomDefaultValues,
  useAutoCalculated,
  selectors,
  reducers,
  PropsProvider,
  usePropsStore,
  InternalProvider,
  useInternalStore,
};
