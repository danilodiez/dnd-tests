import { type DSCustomTreeT } from '../react-desc-prop-types';

export const useAutoCalculated = (propsFromUser: DSCustomTreeT.InternalProps) => {
  const { foo, bar } = propsFromUser;
  return {
    fooBar: `${foo} ${bar}`,
  };
};
