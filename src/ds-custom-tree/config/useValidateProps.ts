import { useValidateTypescriptPropTypes } from '@elliemae/ds-utilities';
import { WeakValidationMap } from 'react';
import { type DSCustomTreeT } from '../react-desc-prop-types';
import { DSCustomTreeName } from '../constants';

export const useValidateProps = (props: DSCustomTreeT.InternalProps, propTypes: WeakValidationMap<unknown>): void => {
  // we validate the "required if" via 'isRequiredIf from our custom PropTypes
  useValidateTypescriptPropTypes(props, propTypes, DSCustomTreeName);
};
