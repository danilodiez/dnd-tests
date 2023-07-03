/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  PropTypes,
  globalAttributesPropTypes,
  xstyledPropTypes,
  GlobalAttributesT,
  XstyledProps,
  DSPropTypesSchema,
} from '@elliemae/ds-utilities';
import type { ZustandT } from '@elliemae/ds-zustand-helpers';
import type { CUSTOM_TREE_REGION_FOCUSES } from './constants';
import type { useAutoCalculated } from './config/useAutoCalculated';

export declare namespace DSCustomTreeT {
  export interface RequiredProps {}

  export interface DefaultProps {}

  export interface OptionalProps {}

  export interface Props
    extends Partial<DefaultProps>,
      OptionalProps,
      Omit<
        GlobalAttributesT<HTMLButtonElement>,
        | keyof DefaultProps
        | keyof OptionalProps
        | keyof RequiredProps
        | keyof XstyledProps
      >,
      XstyledProps,
      RequiredProps {}

  export interface InternalProps
    extends DefaultProps,
      OptionalProps,
      Omit<
        GlobalAttributesT<HTMLButtonElement>,
        | keyof DefaultProps
        | keyof OptionalProps
        | keyof RequiredProps
        | keyof XstyledProps
      >,
      XstyledProps,
      RequiredProps {}

  export type FocusRegion =
    typeof CUSTOM_TREE_REGION_FOCUSES[keyof typeof CUSTOM_TREE_REGION_FOCUSES];
  export type ExampleState = '0' | '1';

  export type InternalAtoms = {
    focusRegion: FocusRegion;
    exampleState: ExampleState;
  };

  export type UseAutoCalculatedT = ReturnType<typeof useAutoCalculated>;

  export type Selectors = {
    getExampleStateIsZero: () => boolean;
  };
  export type Reducers = Record<string, never>;
  export type InternalStore = ZustandT.InternalStore<
    InternalAtoms,
    Selectors,
    Reducers
  >;
}

export const defaultProps: DSCustomTreeT.DefaultProps = {};

export const DSCustomTreePropTypes: DSPropTypesSchema<DSCustomTreeT.Props> = {
  ...globalAttributesPropTypes,
  ...xstyledPropTypes,
  something: PropTypes.string
    .description('some example of proptypes')
    .defaultValue('foo').isRequired,
  onSomethingEvent: PropTypes.func
    .description('some example of function, required if something is not foo')
    .signature(
      '(( newVal: string, e: React.SyntheticEvent, metaInfo: Record<string,unknown> ) => void )'
    )
    .isRequiredIf((props: DSCustomTreeT.Props) => props.something !== 'foo'),
};
