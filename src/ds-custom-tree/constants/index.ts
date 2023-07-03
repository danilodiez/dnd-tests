import { slotObjectToDataTestIds } from '@elliemae/ds-system';

export const DSCustomTreeName = 'ds-custom-tree';

export const EXAMPLE_CONSTANTS = {
  HELLO: 'WORLD',
  FOO: 'BAR',
} as const;

// we are giving "component_name_slots" to avoid errors on duplicate exports variables in aggregators
export const CUSTOM_TREE_REGION_FOCUSES = {
  RESET: '',
} as const;

// we are giving "component_name_slots" to avoid errors on duplicate exports variables in aggregators
export const CUSTOM_TREE_SLOTS = {
  WRAPPER: 'wrapper',
} as const;

// we are giving "component_name_data_testid" to avoid errors on duplicate exports variables in aggregators
export const CUSTOM_TREE_DATA_TESTID = slotObjectToDataTestIds(
  DSCustomTreeName,
  CUSTOM_TREE_SLOTS
);
