// this is a workaround to typescript error TS2742
// https://github.com/microsoft/TypeScript/issues/47663
import type {} from '@xstyled/system';
export { 
    DSCustomTree,
    DSCustomTreeWithSchema
} from './DSCustomTree';
export { type DSCustomTreeT } from './react-desc-prop-types';
export { CUSTOM_TREE_DATA_TESTID } from './constants';
